import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { ownerQueryParams } from "../constants/queryParams/owner.js";
import {
  missingParamMessage,
  responses,
} from "../constants/responseMessages.js";
import { ownerUpdateSchema } from "../schemas/ownerUpdateSchema.js";
import { formatZodError } from "../utils/formatZodError.js";

export const validateOwnerUpdateData = async (c: Context, next: Next) => {
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
    ownerUpdateSchema.parse(data);
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
