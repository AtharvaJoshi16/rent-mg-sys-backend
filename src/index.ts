import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { BlankEnv } from "hono/types";
import { apiDocsHandler } from "../constants/docs/apiDocsHandler.js";
import { authRouter } from "./routes/auth.js";
import { ownerRouter } from "./routes/owner.js";
import { propertyRouter } from "./routes/property.js";
dotenv.config();
const app = new Hono().basePath("/rms/api/v1");

app.get("/health-check", (c) => {
  return c.json({ message: "Health check" });
});

app.use("/", cors() as MiddlewareHandler<BlankEnv, "/api/v1", {}>);

app.route("/owners", ownerRouter);
app.route("/auth", authRouter);
app.route("/properties", propertyRouter);

app.get("/docs", apiDocsHandler);

console.info(`Server is running on http://localhost:${process.env.PORT}`);

serve({
  fetch: app.fetch,
  port: process.env.PORT,
});

export default app;
