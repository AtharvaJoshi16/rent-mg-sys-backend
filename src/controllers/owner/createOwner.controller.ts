import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { createOwner } from "../../repository/createOwner.repo.js";

export const createOwnerController = async (c: Context) => {
  const data = await c.req.json();
  const createOwnerResponse = await createOwner(data);
  return c.json(
    {
      ...createOwnerResponse,
    },
    createOwnerResponse.status as StatusCode
  );
};
