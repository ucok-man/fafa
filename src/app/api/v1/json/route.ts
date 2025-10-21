/* eslint-disable @typescript-eslint/no-explicit-any */
import { Code, StatusCode } from "@/lib/classes/http-error";
import { HTTPResponse } from "@/lib/classes/http-response";
import { RetryablePromise } from "@/lib/classes/retryable-promise";
import { INSTRUCTIONS } from "@/lib/constant";
// import { gemini, GeminiModel } from "@/lib/openai";
import { jsonFormatSchemaToZod } from "@/lib/json-parser";
import { openai } from "@/lib/openai";
import { extractZodErrorMessage } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const DTOSchema = z.object({
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
          const text = await askAi(DTO);

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

async function askAi(dto: z.infer<typeof DTOSchema>) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    instructions: INSTRUCTIONS,
    input: `
    ### Input Data:
    ${dto.data}
  
    ### Target JSON Schema:
    ${JSON.stringify(dto.format, null, 2)}
    `,
  });

  const text = response.output_text;

  return text
    .replace(/^```json[\s\n]*/, "") // Remove starting ```json and optional whitespace/newline
    .replace(/```[\s\n]*$/, "") // Remove trailing ```and optional whitespace/newline
    .trim();
}
