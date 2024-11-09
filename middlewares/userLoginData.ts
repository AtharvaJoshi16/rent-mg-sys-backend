import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { responses } from "../constants/responseMessages.js";
import { userLoginSchema } from "../schemas/userLoginSchema.js";
import { formatZodError } from "../utils/formatZodError.js";

export const validateUserLoginData = async (c: Context, next: Next) => {
  const data = await c.req.json();

  try {
    userLoginSchema.parse(data);
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
