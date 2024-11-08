import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { BlankEnv } from "hono/types";
import { ownerRouter } from "./routes/owner.js";
dotenv.config();
const app = new Hono().basePath("/api/v1");
app.get("/health-check", (c) => {
  return c.json({ message: "Health check" });
});

app.use("/", cors() as MiddlewareHandler<BlankEnv, "/api/v1", {}>);

app.route("/owner", ownerRouter);

console.log(`Server is running on http://localhost:${process.env.PORT}`);

serve({
  fetch: app.fetch,
  port: process.env.PORT,
});

export default app;
