export const SAMPLE_INPUT_DATA = `Project Alpha's final report: The initiative, led by manager Sarah Chen, is now complete. The core development team included Tom, the lead dev, and an intern, Ben. The UI/UX work was handled by an external consultant, Rita. We deployed in two main batches; the first contained builds 1.0.1 and 1.0.2. The second, smaller batch just had build 1.1.0. The backend is built on Node.js and the frontend uses React. This project was tagged for 'Q4' and 'internal-tool'.`;

export const SAMPLE_TARGET_JSON = `{
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
}`;
