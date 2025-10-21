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
}`;

  const CURL_REQUEST_EXAMPLE = `curl -X POST https://fafa.ucokman.web.id/api/v1/json \\
      -H "Content-Type: application/json" \\
      -d '${REQUEST_EXAMPLE.replace(/\n/g, " ").replace(/\s+/g, " ")}'`;

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
}
`;

  return (
    <SectionWrapper title="Examples" id="examples">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            cURL Request
          </h3>
          <CodeBlock code={CURL_REQUEST_EXAMPLE} language="bash" />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Request Example
          </h3>
          <CodeBlock code={REQUEST_EXAMPLE} language="json" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4 flex gap-2 w-full items-center">
            Response Example <StatusBadge status={200} />
          </h3>
          <CodeBlock code={RESPONSE_EXAMPLE} language="json" />
        </div>
      </div>
    </SectionWrapper>
  );
}
