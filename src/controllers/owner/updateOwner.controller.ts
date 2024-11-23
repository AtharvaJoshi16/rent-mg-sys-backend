import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ownerQueryParams } from "../../../constants/queryParams/owner.js";
import { updateOwner } from "../../repository/owner/updateOwner.repo.js";

export const updateOwnerController = async (c: Context) => {
  const data = await c.req.json();
  const user = c.get("user");
  const verificationLink = c.req.query(ownerQueryParams.verificationLink);
  const res = await updateOwner(data, verificationLink!, user?.info?.email);
  return c.json(res, res.status as StatusCode);
};
