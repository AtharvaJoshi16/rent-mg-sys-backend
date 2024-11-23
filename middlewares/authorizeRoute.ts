import { Context, Next } from "hono";
import { errors } from "../constants/errors.js";
import { VerifyTokenResponse } from "../interfaces/verifyTokenResponse.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authorizeRoute = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization");
  const updatedToken = token?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return c.json(
      {
        message: errors.UNAUTHORIZED,
      },
      401
    );
  }

  const data = verifyToken(updatedToken!) as VerifyTokenResponse;

  if (!data.verified) {
    return c.json(data);
  }
  c.set("user", data);
  await next();
};
