import CodeBlock from "./code-block";
import DataTable from "./data-table";
import SectionWrapper from "./section-wrapper";
import StatusBadge from "./status-badge";

export default function SectionError() {
  const HEADERS = ["Status", "Code", "Description", "Example"];
  const ROWS = [
    [
      <StatusBadge key="status-400" status={400} />,
      <code key="code-syntax">SYNTAX_ERROR</code>,
      "Invalid JSON in request body",
      <div key="ex-400" className="text-slate-500">
        Malformed JSON
      </div>,
    ],
    [
      <StatusBadge key="status-422" status={422} />,
      <code key="code-invalid">INVALID_JSON_FORMAT</code>,
      "Invalid request parameters",
      <div key="ex-422" className="text-slate-500">
        Missing required fields
      </div>,
    ],
    [
      <StatusBadge key="status-500" status={500} />,
      <code key="code-internal">INTERNAL_SERVER</code>,
      "Server error",
      <div key="ex-500" className="text-slate-500">
        Processing failed
      </div>,
    ],
  ];

  const RESPONSE_ERROR_EXAMPLE = `{
  "code": "INVALID_JSON_FORMAT",
  "message": "format field must be valid object and required"
}`;

  return (
    <SectionWrapper title="Error Codes" id="errors">
      <div className="space-y-6">
        <DataTable headers={HEADERS} rows={ROWS} />

        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Error Response Format
          </h3>
          <CodeBlock code={RESPONSE_ERROR_EXAMPLE} language="json" />
        </div>
      </div>
    </SectionWrapper>
  );
}
