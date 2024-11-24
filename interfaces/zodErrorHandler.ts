import { StatusCode } from "hono/utils/http-status";

export interface ZodErrorHandler {
  status: StatusCode;
  errors?: {
    field: string;
    message: string;
    path: (string | number)[];
  }[];
  message?: string;
}
