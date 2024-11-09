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
