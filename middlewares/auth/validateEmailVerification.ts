import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { z } from "zod";
import { missingParamMessage } from "../../constants/responseMessages.js";
import { messages } from "../../constants/validationMessages.js";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { UserType } from "../../interfaces/userType.enum.js";

export const validateEmailVerification = async (c: Context, next: Next) => {
  const token = c.req.query("token");
  const userType = c.req.query("userType");

  const userTypeSchema = z.enum(
    [UserType.SUPERUSER, UserType.RENTER, UserType.OWNER],
    {
      message: messages.owner.userType,
    }
  );

  if (!userType || !token) {
    let missingParams = [];
    if (!userType) {
      missingParams.push("userType");
    }
    if (!token) {
      missingParams.push("token");
    }
    return c.json({
      error: missingParamMessage(missingParams),
    });
  }

  try {
    userTypeSchema.parse(userType);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
