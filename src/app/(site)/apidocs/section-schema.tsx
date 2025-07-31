import { Card } from "@/components/ui/card";
import CodeBlock from "./code-block";
import SectionWrapper from "./section-wrapper";

export default function SectionSchema() {
  const SCHEMA_EXAMPLE = `// 01. Schema defintion must be wrapped in an object.
{
  // ...
}

--------------------------------------------------------------------------------------

// 02. To define a value for a field of object or item of array, 
// use \`type\` and optional \`context\` field wrapped in an object.

{"type": /* any primitive type */, "context": "optional context for better understanding"}

--------------------------------------------------------------------------------------

// 03. Minimal basic example.
// You can omit \`context\` if the fieldname already representative.

{"name": {"type": "string"} 

--------------------------------------------------------------------------------------

// 04. Example nested object.

{
  "outerfield": {"type": "string", "context": "..."},
  "section": {
    "nestedField": {"type": "number"}
  }
}

--------------------------------------------------------------------------------------

// 05. Example basic array.
// This will output [ "item1", "item2" ];

{
  "items": [{"type":"string", "context": "the age of cat"}]
}

--------------------------------------------------------------------------------------

// 06. Example nested array.
// This will output: [ ["items1"], ["items2"] ]

{
  "items": [
    [{"type":"number", "context": "the age of cat"}],
  ]
}

--------------------------------------------------------------------------------------

// 07. Example array of an object

{
  "field": {
    "items": [{
      "name": {"type":"string"},
      // ... other field
    }]
  }
}`;

  const SUPPORTED_TYPE_DATA = [
    {
      title: "Primitive Types",
      items: [
        { name: "string", description: "Text values" },
        { name: "number", description: "Numeric values" },
        { name: "boolean", description: "True/false values" },
      ],
    },
    {
      title: "Complex Types",
      items: [
        { name: "object", description: "Nested objects" },
        { name: "array", description: "Lists of items" },
        { name: "null", description: "Missing values" },
      ],
    },
  ];

  return (
    <SectionWrapper title="Schema Format" id="schema">
      <div className="space-y-6">
        <p className="text-slate-700">
          The{" "}
          <span className="bg-slate-300 p-1 px-2 text-slate-700 rounded-lg text-sm">
            format
          </span>{" "}
          parameter defines the structure and data types for the expected JSON
          output. Each field or an item in array requires a{" "}
          <span className="bg-slate-300 p-1 px-2 text-slate-700 rounded-lg text-sm">
            type
          </span>{" "}
          and can optionally include a{" "}
          <span className="bg-slate-300 p-1 px-2 text-slate-700 rounded-lg text-sm">
            context
          </span>{" "}
          for more specific instructions. If the requested data cannot be
          retrieved, the value will be{" "}
          <span className="bg-slate-300 p-1 px-2 text-slate-700 rounded-lg text-sm">
            null
          </span>{" "}
          or an empty array.
        </p>

        <SupportedTypes
          title="Supported Types"
          typesData={SUPPORTED_TYPE_DATA}
        />

        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Schema Example
          </h3>
          <CodeBlock code={SCHEMA_EXAMPLE} language="json" />
        </div>
      </div>
    </SectionWrapper>
  );
}

type TypeCardProps = {
  title: string;
  items: {
    name: string;
    description: string;
  }[];
};

function TypeCard({ title, items }: TypeCardProps) {
  return (
    <Card className="px-4 gap-0">
      <h4 className="font-semibold text-primary mb-4">{title}</h4>
      <ul className="space-y-1 text-sm text-slate-500">
        {items.map(function (item) {
          return (
            <li key={item.name}>
              <code className="text-primary">{item.name}</code> -{" "}
              {item.description}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

// Define the props for the main component
type SupportedTypesProps = {
  title: string;
  typesData: {
    title: string;
    items: {
      name: string;
      description: string;
    }[];
  }[];
};

function SupportedTypes({ title, typesData }: SupportedTypesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {typesData.map(function (typeGroup) {
          return (
            <TypeCard
              key={typeGroup.title}
              title={typeGroup.title}
              items={typeGroup.items}
            />
          );
        })}
      </div>
    </div>
  );
}
