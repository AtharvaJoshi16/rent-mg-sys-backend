import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { missingParamMessage } from "../../constants/responseMessages.js";
import { zodErrorHandler } from "../../handlers/zodErrorHandler.js";
import { propertyId } from "../../schemas/property/createPropertySchema.js";

export const validatePropertyGetData = async (c: Context, next: Next) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        error: missingParamMessage(["id"]),
      },
      400
    );
  }

  try {
    propertyId.parse(id);
    await next();
  } catch (e) {
    const errorRes = zodErrorHandler(e as Error);
    return c.json({ ...errorRes }, errorRes.status as StatusCode);
  }
};
