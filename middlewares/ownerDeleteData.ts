import { Context, Next } from "hono";
import { ownerId } from "../schemas/ownerBaseSchema.js";
import { ZodError } from "zod";
import { formatZodError } from "../utils/formatZodError.js";
import { responses } from "../constants/responseMessages.js";
import { StatusCode } from "hono/utils/http-status";

export const validateOwnerDeleteData = async (c: Context, next: Next) => {
  const id = parseInt(c.req.param("id"));

  try {
    ownerId.parse(id);
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
