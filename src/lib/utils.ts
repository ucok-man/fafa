import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts and formats validation errors from a ZodError object into a single string.
 * @param error The ZodError object from a failed safeParse.
 * @returns A single string summarizing all validation errors.
 */
export const extractZodErrorMessage = (error: ZodError): string => {
  return error.issues
    .map((issue) => {
      // The path to the invalid field (e.g., 'user.name')
      const path = issue.path.join(".");

      // The error message for that specific field
      const message = issue.message;

      // Return a formatted string "path: message"
      // If path is empty, it means the error is on the root object itself.
      return `${path ? `${path}: ` : ""}${message}`;
    })
    .join("; "); // Join all error messages with a semicolon and space
};
