export type Primitive = "string" | "boolean" | "number";

export type Value = { type: Primitive; context?: string };

export type Arr = [Value | Obj | Arr];

export type Obj = {
  [key: string]: Value | Obj | Arr;
};

export type JsonFormat = Record<string, Value | Obj | Arr>;
