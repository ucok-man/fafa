/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

const VALID_TYPE_VALUE = ["string", "boolean", "number"];

const determineType = (
  schema: any,
  key?: string
): "string" | "number" | "boolean" | "array" | "object" => {
  if (typeof schema !== "object") {
    throw new Error(
      `invalid \`format\` schema, receive unknown value \`${schema}\` on field \`${key}\``
    );
  }

  if (Array.isArray(schema)) {
    if (!schema.length) {
      throw new Error(
        `invalid \`format\` schema, receive an empty array on field \`${key}\``
      );
    }

    if (schema.length > 1) {
      throw new Error(
        `invalid \`format\` schema, array must contain exactly one item on field \`${key}\``
      );
    }

    const item = schema[0];
    if (typeof item !== "object") {
      throw new Error(
        `invalid \`format\` schema, array item must be object or an array on field \`${key}\``
      );
    }

    if (!Array.isArray(item) && !Object.keys(item).length) {
      throw new Error(
        `invalid \`format\` schema, receive empty object on array item on field \`${key}\``
      );
    }

    return "array";
  }

  const keys = Object.keys(schema);
  if (keys.length === 0) {
    throw new Error(
      `invalid \`format\` schema, receive an empty object on field \`${key}\``
    );
  }

  const typeField = keys.find((k) => k === "type");
  const contextField = keys.find((k) => k === "context");

  if (typeField && contextField && keys.length > 2) {
    throw new Error(
      `invalid \`format\` schema, mixed \`type\` and \`context\` field with other fields on field \`${key}\``
    );
  }

  if (typeField && !contextField && keys.length > 1) {
    throw new Error(
      `invalid \`format\` schema, mixed \`type\` field with other fields on field \`${key}\``
    );
  }

  if (!typeField && contextField && keys.length > 1) {
    throw new Error(
      `invalid \`format\` schema, mixed \`context\` field with other fields on field \`${key}\``
    );
  }

  if (schema.type) {
    if (!VALID_TYPE_VALUE.find((v) => v === schema.type)) {
      throw new Error(
        `invalid \`format\` schema, unknown \`type\` field value \`${schema.type}\` on field \`${key}\``
      );
    }
    return schema.type;
  }

  return "object";
};

export const jsonFormatSchemaToZod = (schema: any, key?: string): z.ZodType => {
  const type = determineType(schema, key);

  switch (type) {
    case "string":
      return z
        .string()
        .nullish()
        .transform((val) => (!val ? null : val));
    case "number":
      return z
        .number()
        .nullish()
        .transform((val) => (!val ? null : val));
    case "boolean":
      return z
        .boolean()
        .nullish()
        .transform((val) => (!val ? null : val));
    case "array":
      return z.array(jsonFormatSchemaToZod(schema[0]));
    case "object":
      const shape: Record<string, z.ZodType> = {};
      for (const key in schema) {
        shape[key] = jsonFormatSchemaToZod(schema[key], key);
      }
      return z.object(shape);

    default:
      throw new Error(`Error format schema - unsupported data type ${type}`);
  }
};
