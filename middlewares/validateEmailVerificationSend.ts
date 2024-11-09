import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { z, ZodError } from "zod";
import {
  missingParamMessage,
  responses,
} from "../constants/responseMessages.js";
import { messages } from "../constants/validationMessages.js";
import { UserType } from "../interfaces/userType.enum.js";
import { formatZodError } from "../utils/formatZodError.js";

export const validateEmailVerificationSend = async (c: Context, next: Next) => {
  const email = c.req.query("email");
  const userType = c.req.query("userType");
  const verificationLink = c.req.query("verificationLink");
  const emailSchema = z.string().email();
  const userTypeSchema = z.enum(
    [UserType.SUPERUSER, UserType.RENTER, UserType.OWNER],
    {
      message: messages.owner.userType,
    }
  );

  if (!email || !userType || !verificationLink) {
    let missingParams = [];
    if (!email) {
      missingParams.push("email");
    }
    if (!userType) {
      missingParams.push("userType");
    }
    if (!verificationLink) {
      missingParams.push("verificationLink");
    }
    return c.json({
      error: missingParamMessage(missingParams),
    });
  }

  try {
    emailSchema.parse(email);
    userTypeSchema.parse(userType);
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
