import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { ownerId } from "../../schemas/owner/ownerBaseSchema.js";

export const validateOwnerDeleteData = async (c: Context, next: Next) => {
  const id = parseInt(c.req.param("id"));

  try {
    ownerId.parse(id);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
