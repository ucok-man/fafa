/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractZodErrorMessage(error: ZodError): string {
  const fmterr = z.formatError(error);

  const iterate = (obj: any): string => {
    if (obj?._errors?.length) {
      return obj._errors[0] as string;
    }
    for (const key in obj) {
      if (key === "_errors") continue;
      return iterate(obj[key]);
    }
    throw new Error("NO ERROR EXIST FROM ZOD ERROR");
  };

  return iterate(fmterr);
}
