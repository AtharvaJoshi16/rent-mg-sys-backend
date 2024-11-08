import { formatZodError } from "../formatZodError.js";

describe("Checking formatZodError function", () => {
  it("Should return valid response", () => {
    const err = {
      errors: [
        {
          code: "invalid_string",
          validation: "email",
          message: "Invalid Email",
          path: ["email"],
        },
        {
          code: "custom",
          message: "Password must contain at least one special character",
          path: ["password"],
        },
      ],
    };
    const res = formatZodError(err as any);
    expect(res).not.toBe(null);
  });
});
