import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { BlankEnv } from "hono/types";
import { apiDocsHandler } from "../constants/docs/apiDocsHandler.js";
import { rateLimiterMiddleware } from "../middlewares/rateLimiter.middleware.js";
import { authRouter } from "./routes/auth.js";
import { ownerRouter } from "./routes/owner.js";
import { propertyRouter } from "./routes/property.js";
dotenv.config();
const BASE_PATH = "/rms/api/v1";
const app = new Hono().basePath(BASE_PATH);

const rateLimitStore: Record<string, { count: number; expires: number }> = {};

app.get(
  "/health-check",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  (c) => {
    return c.json({ message: "Health check" });
  }
);

app.use("/", cors() as MiddlewareHandler<BlankEnv, "/rms/api/v1", {}>);

app.route("/owners", ownerRouter);
app.route("/auth", authRouter);
app.route("/properties", propertyRouter);

app.get(
  "/docs",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  apiDocsHandler
);

console.info(
  `Server is running on http://${process.env.HOST_NAME}:${process.env.PORT}`
);

serve({
  fetch: app.fetch,
  port: process.env.PORT,
});

export default app;
