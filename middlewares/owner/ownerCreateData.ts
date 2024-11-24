import type { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ownerQueryParams } from "../../constants/queryParams/owner.js";
import { missingParamMessage } from "../../constants/responseMessages.js";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { ownerCreateSchema } from "../../schemas/owner/ownerCreateSchema.js";

export const validateOwnerData = async (c: Context, next: Next) => {
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
    ownerCreateSchema.parse(data);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
