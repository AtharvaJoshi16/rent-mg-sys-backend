import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import {
  missingParamMessage,
  responses,
} from "../constants/responseMessages.js";
import { ownerId } from "../schemas/ownerCreateSchema.js";
import { formatZodError } from "../utils/formatZodError.js";

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
