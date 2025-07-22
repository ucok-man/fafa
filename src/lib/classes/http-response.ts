/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { Code, HttpError, StatusCode } from "./http-error";

export class HTTPResponse {
  public static error = (
    statusCode: StatusCode,
    { code, message, _error }: { code: Code; message: string; _error?: Error }
  ) => {
    if (statusCode >= 500) {
      console.error(`\n⁉️ INTERNAL ERROR: ${_error}\n`);
    }

    return NextResponse.json(
      new HttpError(statusCode, {
        code: code,
        message: message,
        _error: _error,
      }),
      { status: statusCode }
    );
  };

  public static success = (statusCode: StatusCode, data: any) => {
    return NextResponse.json(data, { status: statusCode });
  };
}
