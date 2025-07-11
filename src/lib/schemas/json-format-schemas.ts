import z from "zod";
import { Arr, Obj, Value } from "../types/json-format-type";

const PrimitiveSchema = z.enum(["string", "boolean", "number"]);

const ValueSchema = z.object({
  type: PrimitiveSchema,
  context: z.string().optional(),
});

const FormatSchema: z.ZodType<Value | Obj | Arr> = z.lazy(() =>
  z.union([
    ValueSchema, // Value
    z.record(z.string(), FormatSchema), // Obj
    z.tuple([FormatSchema]), // Arr
  ])
);

export const JsonFormatSchema = z.record(z.string(), FormatSchema);
