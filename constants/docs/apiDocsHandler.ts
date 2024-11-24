import { swaggerUI } from "@hono/swagger-ui";
import { specs } from "./specs/index.js";

export const apiDocsHandler = swaggerUI({
  spec: specs,
  urls: [
    {
      name: "Owners",
      url: "/api/v1/owners",
    },
    {
      name: "Auth",
      url: "/api/v1/auth",
    },
  ],
});
