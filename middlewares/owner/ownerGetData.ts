import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { missingParamMessage } from "../../constants/responseMessages.js";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { ownerId } from "../../schemas/owner/ownerBaseSchema.js";

export const validateOwnerGetData = async (c: Context, next: Next) => {
  const id = parseInt(c.req.param("id"));

  if (!id) {
    return c.json(
      {
        error: missingParamMessage(["id"]),
      },
      400
    );
  }

  try {
    ownerId.parse(id);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
