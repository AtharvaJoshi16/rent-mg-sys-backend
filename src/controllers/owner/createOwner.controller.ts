import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { ownerQueryParams } from "../../../constants/queryParams/owner.js";
import { createOwner } from "../../repository/createOwner.repo.js";

export const createOwnerController = async (c: Context) => {
  const data = await c.req.json();
  const emailVerificationLink = c.req.query(ownerQueryParams.verificationLink);
  const createOwnerResponse = await createOwner(
    data,
    emailVerificationLink as string
  );
  return c.json(
    {
      ...createOwnerResponse,
    },
    createOwnerResponse.status as StatusCode
  );
};
