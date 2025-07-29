/* eslint-disable @typescript-eslint/no-explicit-any */
import { Code, StatusCode } from "@/lib/classes/http-error";
import { HTTPResponse } from "@/lib/classes/http-response";
import { RetryablePromise } from "@/lib/classes/retryable-promise";
import { gemini, GeminiModel } from "@/lib/gemini";
import { jsonFormatSchemaToZod } from "@/lib/json-parser";
import { extractZodErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const DTOSchema = z.object({
  data: z
    .string({ error: "`data` field must be valid string and required" })
    .trim(),
  format: z.record(z.string(), z.any(), {
    error: "`format` field must be valid object and required",
  }),
});

export async function POST(req: NextRequest) {
  /* -------------------- validate input request -------------------- */
  let body;
  try {
    body = await req.json();
  } catch (error: any) {
    return HTTPResponse.error(StatusCode.BAD_REQUEST, {
      code: Code.SYNTAX_ERROR,
      message: error.message.toLocaleLowerCase(),
    });
  }

  const { data: DTO, error } = DTOSchema.safeParse(body);
  if (error) {
    return HTTPResponse.error(StatusCode.UNPROCESSABLE_ENTITY, {
      code: Code.INVALID_JSON_FORMAT,
      message: extractZodErrorMessage(error).toLocaleLowerCase(),
    });
  }

  /* ---------- create zod schema from the expected user format --------- */
  let targetSchema: z.ZodType;
  try {
    targetSchema = jsonFormatSchemaToZod(DTO.format);
  } catch (error: any) {
    return HTTPResponse.error(StatusCode.UNPROCESSABLE_ENTITY, {
      code: Code.INVALID_JSON_FORMAT,
      message: error.message,
    });
  }

  try {
    const jsonformat = await RetryablePromise.retry<Record<string, any>>(
      2,
      async (resolve, reject) => {
        try {
          /* -------------------------- pass to llm ------------------------- */
          const text = await askgemini(DTO);

          /* ------------------------ validate result ----------------------- */
          const result = targetSchema.parse(JSON.parse(text)) as Record<
            string,
            any
          >;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }
    );

    return NextResponse.json({ result: jsonformat }, { status: 200 });
  } catch (error) {
    return HTTPResponse.error(StatusCode.INTERNAL_SERVER_ERROR, {
      code: Code.INTERNAL_SERVER,
      message: "sorry we have problem in our server, please try again later!",
      _error: error instanceof Error ? error : new Error(`${error}`),
    });
  }
}

async function askgemini(dto: z.infer<typeof DTOSchema>) {
  const { text } = await gemini.models.generateContent({
    model: GeminiModel.GEMINI_1_5_FLASH,
    contents: `You are a highly specialized AI assistant with an exceptional ability to parse and convert unstructured text into a structured JSON object.
  
              ## Core Mission
              Your sole mission is to meticulously analyze the provided "Input Data" and transform it into a single, valid JSON object that strictly conforms to the structure, keys, and data types defined in the "Target JSON Schema".
  
              ## Core Instructions
              1.  **Output Must Be a Single JSON Object**: Your entire output MUST be a single, raw JSON object. Do NOT include any explanatory text, comments, or markdown formatting like \`\`\`json.
              2.  **Strict Schema Adherence**: It is critical that you do not deviate from the provided schema. Do not invent new keys or ignore existing ones. The structure of your output (nesting, arrays, objects) must exactly match the schema.
              3.  **Schema Defines Structure & Type**: The \`Target JSON Schema\` dictates the required keys and the **data type** for each corresponding value in your output. For a schema entry like \`"age": { "type": "number" }\`, you must find the age in the text and place the *actual number* (e.g., \`35\`) in the output, not an object.
              4.  **Handle Missing Information**:
                  * If a specific **field's value** cannot be determined from the input text, you MUST use \`null\` for that field.
                  * If no items can be found for a field defined as an **array**, you MUST use an empty array \`[]\`.
              5.  **Data Type Coercion**: You MUST convert extracted text into the correct data type as specified by the schema.
                  * \`"type": "number"\`: Convert text like "thirty-five" or "1,000" into \`35\` or \`1000\`.
                  * \`"type": "boolean"\`: Infer the boolean value. For example, if the text says "the project is complete" or "is active", and the schema expects a boolean, use \`true\`. Use \`false\` if the text indicates a negative status.
              6.  **Logical Inference**: Use the context provided in the schema (e.g., \`context: "The primary contact for the project"\`) to better inform your value extraction.
  
              ---
  
              ## Example
  
              ### Input Data:
              "Project Alpha's final report: The initiative, led by manager Sarah Chen, is now complete. The core development team included Tom, the lead dev, and an intern, Ben. The UI/UX work was handled by an external consultant, Rita. We deployed in two main batches; the first contained builds 1.0.1 and 1.0.2. The second, smaller batch just had build 1.1.0. The backend is built on Node.js and the frontend uses React. This project was tagged for 'Q4' and 'internal-tool'."
  
              ### Target JSON Schema:
              {
                "projectName": { "type": "string" },
                "isCompleted": { "type": "boolean" },
                "manager": {
                    "name": { "type": "string", "context": "Full name of the project leader." },
                    "email": { "type": "string" }
                },
                "team": [
                    {
                    "name": { "type": "string" },
                    "role": { "type": "string", "context": "e.g., lead dev, intern" }
                    }
                ],
                "technicalSpecs": {
                    "backend": { "type": "string", "context": "The primary backend technology" },
                    "frontend": { "type": "string", "context": "The primary frontend framework" }
                },
                "tags": [
                    { "type": "string" }
                ],
                "deploymentBatches": [
                    [ { "type": "string" } ]
                ]
              }
  
              ### Expected JSON Output:
              {
              "projectName": "Project Alpha",
              "isCompleted": true,
              "manager": {
                  "name": "Sarah Chen",
                  "email": null
              },
              "team": [
                  {
                  "name": "Tom",
                  "role": "lead dev"
                  },
                  {
                  "name": "Ben",
                  "role": "intern"
                  },
                  {
                  "name": "Rita",
                  "role": "UI/UX consultant"
                  }
              ],
              "technicalSpecs": {
                  "backend": "Node.js",
                  "frontend": "React"
              },
              "tags": [
                  "Q4",
                  "internal-tool"
              ],
              "deploymentBatches": [
                  [
                  "1.0.1",
                  "1.0.2"
                  ],
                  [
                  "1.1.0"
                  ]
              ]
              }
  
              ---
  
              ##Your Task
  
              ### Input Data:
              ${dto.data}
  
              ### Target JSON Schema:
              ${JSON.stringify(dto.format, null, 2)}
  
              ### Expected JSON Output:`,
  });

  if (!text) {
    throw new Error(`there is no response text from gemini`);
  }

  return text
    .replace(/^```json[\s\n]*/, "") // Remove starting ```json and optional whitespace/newline
    .replace(/```[\s\n]*$/, "") // Remove trailing ```and optional whitespace/newline
    .trim();
}
