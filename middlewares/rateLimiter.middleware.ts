import { Context, Next } from "hono";
import { errors } from "../constants/errors.js";

export const rateLimiterMiddleware = (
  limit: number,
  durationMs: number,
  rateLimitStore: Record<string, { count: number; expires: number }>
) => {
  return async (c: Context, next: Next) => {
    const ip =
      c.req.header("x-forwarded-for") || c.req.header("host") || "unknown";
    const now = Date.now();

    if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = { count: 1, expires: now + durationMs };
    } else {
      const userData = rateLimitStore[ip];

      if (now > userData.expires) {
        userData.count = 1;
        userData.expires = now + durationMs;
      } else if (userData.count >= limit) {
        return c.json(
          {
            status: 429,
            message: errors.TOO_MANY_REQUESTS,
          },
          429
        );
      } else {
        userData.count += 1;
      }
    }

    await next();
  };
};
