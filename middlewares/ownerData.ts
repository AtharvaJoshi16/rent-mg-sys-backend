import type { Context, Next } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { responses } from "../constants/responseMessages.js";
import { ownerSchema } from "../schemas/ownerSchema.js";
import { formatZodError } from "../utils/formatZodError.js";

export const validateOwnerData = async (c: Context, next: Next) => {
  const data = await c.req.json();
  try {
    ownerSchema.parse(data);
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
