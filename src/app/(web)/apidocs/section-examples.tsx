import { Separator } from "@/components/ui/separator";
import CodeBlock from "./code-block";
import SectionWrapper from "./section-wrapper";
import StatusBadge from "./status-badge";

export default function SectionExample() {
  const REQUEST_EXAMPLE = `{
  "data": "Project Alpha's final report: The initiative, led by manager Sarah Chen, is now complete. The core development team included Tom, the lead dev, and an intern, Ben.",
  "format": {
    "projectName": { "type": "string" },
    "isCompleted": { "type": "boolean" },
    "manager": {
      "name": {
        "type": "string",
        "context": "Full name of the project leader."
      },
      "email": { "type": "string" }
    },
    "team": [
      {
        "name": { "type": "string" },
        "role": { "type": "string", "context": "e.g., lead dev, intern" }
      }
    ]
  }
}`.trim();

  const CURL_REQUEST_EXAMPLE =
    `curl -X POST https://fafa.ucokman.web.id/api/v1/json \\
  -H "Content-Type: application/json" \\
  -d '{"data":"Project Alpha final report: The initiative, led by manager Sarah Chen, is now complete. The core development team included Tom, the lead dev, and an intern, Ben.","format":{"projectName":{"type":"string"},"isCompleted":{"type":"boolean"},"manager":{"name":{"type":"string","context":"Full name of the project leader."},"email":{"type":"string"}},"team":[{"name":{"type":"string"},"role":{"type":"string","context":"e.g., lead dev, intern"}}]}}'`.trim();

  const RESPONSE_EXAMPLE = `{
  "result": {
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
      }
    ]
  }
}`.trim();

  return (
    <SectionWrapper title="Examples" id="examples">
      <div className="space-y-8">
        {/* Introduction */}
        <p className="text-slate-600 leading-relaxed">
          Below are practical examples demonstrating how to use the API
          endpoint. The examples show request formatting and expected response
          structure.
        </p>

        <Separator className="my-8" />

        {/* cURL Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              cURL Request
            </h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              Shell
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Copy and paste this command into your terminal to test the API
            endpoint.
          </p>
          <CodeBlock code={CURL_REQUEST_EXAMPLE} language="bash" />
        </div>

        <Separator className="my-8" />

        {/* Request Body Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              Request Body
            </h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              JSON
            </span>
          </div>
          <p className="text-sm text-slate-600">
            The request body should contain the unstructured data and the
            desired output format schema.
          </p>
          <CodeBlock code={REQUEST_EXAMPLE} language="json" />
        </div>

        <Separator className="my-8" />

        {/* Response Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-semibold text-slate-900">
                Response
              </h3>
              <StatusBadge status={200} />
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              JSON
            </span>
          </div>
          <p className="text-sm text-slate-600">
            The API returns the extracted and structured data matching your
            specified format.
          </p>
          <CodeBlock code={RESPONSE_EXAMPLE} language="json" />
        </div>
      </div>
    </SectionWrapper>
  );
}
