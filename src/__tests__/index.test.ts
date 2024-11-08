import { serve, ServerType } from "@hono/node-server";
import { testClient } from "hono/testing";
import app from "../index.js";

let server: ServerType;

describe("Testing API Endpoints", () => {
  beforeAll(() => {
    server = serve({
      fetch: app.fetch,
      port: process.env.TEST_PORT,
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        server.close();
      }
    });
  });

  afterAll(async () => {
    server?.close();
  });

  it("GET /health-check should return Health Check", async () => {
    const res = await testClient(app.get("/health-check")).api.v1[
      "health-check"
    ].$get();
    expect(res.status).toBe(200);
  });
});
