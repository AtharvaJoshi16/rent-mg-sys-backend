import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { userLoginSchema } from "../../schemas/auth/userLoginSchema.js";

export const validateUserLoginData = async (c: Context, next: Next) => {
  const data = await c.req.json();

  try {
    userLoginSchema.parse(data);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
