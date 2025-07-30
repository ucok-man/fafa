import DataTable from "./data-table";
import MethodBadge from "./method-badge";
import SectionWrapper from "./section-wrapper";

export default function SectionEndpoint() {
  const HEADERS = ["Parameter", "Type", "Description"];
  const ROWS = [
    [
      <div key="data" className="font-mono text-slate-900">
        data
      </div>,
      "string",
      <div key="data-desc" className="text-slate-500">
        The unstructured text to parse.
      </div>,
    ],
    [
      <div key="format" className="font-mono text-slate-900">
        format
      </div>,
      "object",
      <div key="format-desc" className="text-slate-500">
        JSON schema defining the expected output structure.
      </div>,
    ],
  ];
  const ENDPOINT = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/json`;
  const METHOD = "POST";
  //   const RESPONSE_SUCCESS_EXAMPLE = `{
  //     "result": {
  //       "projectName": "Project Alpha",
  //       "isCompleted": true,
  //       "manager": {
  //         "name": "Sarah Chen",
  //         "email": null
  //       },
  //       "team": [
  //         {
  //           "name": "Tom",
  //           "role": "lead dev"
  //         },
  //         {
  //           "name": "Ben",
  //           "role": "intern"
  //         }
  //       ]
  //     }
  //   }`;

  return (
    <SectionWrapper title="Endpoint" id="endpoint">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 grainy-dark border/80 rounded-lg">
          <MethodBadge method={METHOD} />
          <code className="flex-1 text-lg font-mono">{ENDPOINT}</code>
        </div>

        <DataTable title="Request Body" headers={HEADERS} rows={ROWS} />

        {/* <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Response
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <StatusBadge status={200} />
            <span className="text-slate-500">Successful parsing</span>
          </div>
          <CodeBlock code={RESPONSE_SUCCESS_EXAMPLE} language="json" />
        </div> */}
      </div>
    </SectionWrapper>
  );
}
