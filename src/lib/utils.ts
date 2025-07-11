import z from "zod";
import { JsonFormat } from "./types/json-format-type";

export const jsonFormatSchemaToZod = (schema: JsonFormat): z.ZodType => {
  const type = typeof schema;

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "object": // -> this type can be plain object or array
      /* ------------------------ case when array ----------------------- */
      if (Array.isArray(schema)) {
        if (!schema.length)
          throw new Error(
            "Error format schema - array defined but has no items"
          );

        return z.array(jsonFormatSchemaToZod(schema[0]));
      }

      /* -------------------- case when plain object -------------------- */
      const shape: Record<string, z.ZodType> = {};
      for (const key in schema) {
        if (key !== "type") {
          shape[key] = jsonFormatSchemaToZod(schema[key] as JsonFormat);
        }
      }
      return z.object(shape);

    default:
      throw new Error(`Error format schema - unsupported data type ${type}`);
  }
};
