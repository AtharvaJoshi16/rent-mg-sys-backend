import { Context, Next } from "hono";
import { ownersGetSchema } from "../schemas/ownersGetSchema.js";
import { ZodError } from "zod";
import { formatZodError } from "../utils/formatZodError.js";
import { responses } from "../constants/responseMessages.js";
import { StatusCode } from "hono/utils/http-status";

export const validateGetOwnersData = async (c: Context, next: Next) => {
  const data = c.req.query();
  try {
    const parsedQueries = ownersGetSchema.parse(data);
    c.set("parsedQueries", parsedQueries);
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
