export enum StatusCode {
  STATUS_OK = 200,

  BAD_REQUEST = 400,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Code {
  INVALID_JSON_FORMAT = "INVALID_JSON_FORMAT",
  SYNTAX_ERROR = "SYNTAX_ERROR",
  INTERNAL_SERVER = "INTERNAL_SERVER",
}

export class HttpError extends Error {
  public statusCode: StatusCode;
  public code: Code;
  public message: string;

  constructor(
    statusCode: StatusCode,
    { code, message, _error }: { code: Code; message: string; _error?: Error }
  ) {
    super(_error?.message || message);
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
  }
}
