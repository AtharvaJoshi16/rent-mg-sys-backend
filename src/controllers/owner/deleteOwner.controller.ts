import { Context } from "hono";
import { deleteOwner } from "../../repository/owner/deleteOwner.repo.js";
import { StatusCode } from "hono/utils/http-status";

export const deleteOwnerController = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  const user = c.get("user");
  const res = await deleteOwner(id, user?.info?.email);
  return c.json(res, res.status as StatusCode);
};
