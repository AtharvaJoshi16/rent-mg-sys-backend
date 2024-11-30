import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { CreatePropertySchema } from "../../../schemas/property/createPropertySchema.js";
import { createProperty } from "../../repository/property/createProperty.repo.js";

export const createPropertyController = async (c: Context) => {
  const payload: CreatePropertySchema = await c.req.json();
  const user = c.get("user");
  const res = await createProperty(payload, user?.info?.email);
  return c.json(res, res.status as StatusCode);
};
