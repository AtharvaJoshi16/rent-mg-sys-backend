import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ownerQueryParams } from "../../constants/queryParams/owner.js";
import { missingParamMessage } from "../../constants/responseMessages.js";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { ownerUpdateSchema } from "../../schemas/owner/ownerUpdateSchema.js";

export const validateOwnerUpdateData = async (c: Context, next: Next) => {
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
    ownerUpdateSchema.parse(data);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
