import type { Context, Next } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { ownerQueryParams } from "../constants/queryParams/owner.js";
import {
  missingParamMessage,
  responses,
} from "../constants/responseMessages.js";
import { ownerCreateSchema } from "../schemas/ownerCreateSchema.js";
import { formatZodError } from "../utils/formatZodError.js";

export const validateOwnerData = async (c: Context, next: Next) => {
  const data = await c.req.json();

  const emailVerificationLink = c.req.query(ownerQueryParams.verificationLink);

  if (!emailVerificationLink) {
    return c.json(
      {
        error: missingParamMessage([ownerQueryParams.verificationLink]),
      },
      400
    );
  }

  try {
    ownerCreateSchema.parse(data);
    await next();
  } catch (e) {
    if (e instanceof ZodError) {
      return c.json(
        {
          errors: formatZodError(e),
        },
        400
      );
    } else {
      return c.json({ message: responses.UNKNOWN }, 520 as StatusCode);
    }
  }
};