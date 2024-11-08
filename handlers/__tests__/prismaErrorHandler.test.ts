import { prismaErrorHandler } from "../prismaErrorHandler.js";

describe("Checking prismaErrorHandler function", () => {
  it("Should return valid error", () => {
    const err = {
      code: "P2002",
      clientVersion: "5.22.0",
      meta: { modelName: "Owner", target: ["email"] },
    };
    const res = prismaErrorHandler(err as any);
    expect(res.status).toBe(500);
  });
});
