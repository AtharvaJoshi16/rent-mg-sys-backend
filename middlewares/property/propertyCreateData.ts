import { Context, Next } from "hono";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { createPropertySchema } from "../../schemas/property/createPropertySchema.js";

export const validatePropertyCreateData = async (c: Context, next: Next) => {
  const data = await c.req.json();
  try {
    createPropertySchema.parse(data);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status);
  }
};
