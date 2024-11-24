import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { ownerQueryParams } from "../../../constants/queryParams/owner.js";
import { CreateOwnerSchema } from "../../../schemas/owner/ownerCreateSchema.js";
import { createOwner } from "../../repository/owner/createOwner.repo.js";

export const createOwnerController = async (c: Context) => {
  const data: CreateOwnerSchema = await c.req.json();
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
