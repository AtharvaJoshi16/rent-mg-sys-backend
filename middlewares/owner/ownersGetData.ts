import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { ownersGetSchema } from "../../schemas/owner/ownersGetSchema.js";

export const validateGetOwnersData = async (c: Context, next: Next) => {
  const data = c.req.query();
  try {
    const parsedQueries = ownersGetSchema.parse(data);
    c.set("parsedQueries", parsedQueries);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
