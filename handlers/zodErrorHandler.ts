import { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { responses } from "../constants/responseMessages.js";
import { ZodErrorHandler } from "../interfaces/zodErrorHandler.js";
import { formatZodError } from "../utils/formatZodError.js";

export const zodErrorHandler = (e: Error): ZodErrorHandler => {
  if (e instanceof ZodError) {
    return {
      status: 400,
      errors: formatZodError(e),
    };
  } else {
    return { status: 520 as StatusCode, message: responses.UNKNOWN };
  }
};
