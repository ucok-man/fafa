# Fafa - JSON data conversion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> 🚀 API Service to transform any unstructured data into clean, valid JSON with custom schema definitions.

## 🔗 Links

- **Documentation**: [https://fafa.ucokman.web.id/apidocs](https://fafa.ucokman.web.id/apidocs)
- **Playground**: [https://fafa.ucokman.web.id/playground](https://fafa.ucokman.web.id/playground)

## 🔧 API Usage

### Curl Example

```bash
curl -X POST https://fafa.ucokman.web.id/api/v1/json \
  -H "Content-Type: application/json" \
  -d '{"data":"Project Alpha final report: The initiative, led by manager Sarah Chen, is now complete. The core development team included Tom, the lead dev, and an intern, Ben.","format":{"projectName":{"type":"string"},"isCompleted":{"type":"boolean"},"manager":{"name":{"type":"string","context":"Full name of the project leader."},"email":{"type":"string"}},"team":[{"name":{"type":"string"},"role":{"type":"string","context":"e.g., lead dev, intern"}}]}}'
```

**Example Response:**

```json
{
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
```

### Javascript Example

```javascript
const response = await fetch("https://fafa.ucokman.web.id/api/v1/json", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    data: `Project Alpha Report:
           Manager: Sarah Chen (sarah@company.com)
           Team: Tom (Lead Dev), Ben (Intern), Rita (Designer)
           Status: Completed
           Tech Stack: Node.js backend, React frontend
           Tags: Q4, internal-tool`,
    format: {
      projectName: { type: "string" },
      manager: {
        name: { type: "string" },
        email: { type: "string" },
      },
      team: [
        {
          name: { type: "string" },
          role: { type: "string" },
        },
      ],
      isCompleted: { type: "boolean" },
      techStack: {
        backend: { type: "string" },
        frontend: { type: "string" },
      },
      tags: [{ type: "string" }],
    },
  }),
});
```

## 📋 Schema Format Guide

### Supported Data Types

| Type      | Description       | Example              |
| --------- | ----------------- | -------------------- |
| `string`  | Text values       | `"John Doe"`         |
| `number`  | Numeric values    | `42`, `3.14`         |
| `boolean` | True/false values | `true`, `false`      |
| `object`  | Nested objects    | `{"key": "value"}`   |
| `array`   | Lists of items    | `["item1", "item2"]` |
| `null`    | Missing values    | `null`               |

### Schema Structure

```typescript
{
  // Simple field
  "fieldName": { "type": "string" },

  // Field with context for better AI understanding
  "email": {
    "type": "string",
    "context": "Primary email address"
  },

  // Nested object
  "address": {
    "street": { "type": "string" },
    "city": { "type": "string" },
    "zipCode": { "type": "number" }
  },

  // Array of primitives
  "tags": [{ "type": "string" }],

  // Array of objects
  "team": [{
    "name": { "type": "string" },
    "role": { "type": "string" }
  }],

  // Nested arrays
  "batches": [[{ "type": "string" }]]
}
```

## 📊 Error Handling

The API provides detailed error responses:

| Status Code | Error Code            | Description                  |
| ----------- | --------------------- | ---------------------------- |
| `400`       | `SYNTAX_ERROR`        | Invalid JSON in request body |
| `422`       | `INVALID_JSON_FORMAT` | Invalid request parameters   |
| `500`       | `INTERNAL_SERVER`     | Server processing error      |

**Error Response Example:**

```json
{
  "code": "INVALID_JSON_FORMAT",
  "message": "format field must be valid object and required"
}
```
