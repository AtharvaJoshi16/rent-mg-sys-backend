import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { IProperty } from "../../../interfaces/property.js";
import { getPropertyFilteredData } from "../../../utils/getPropertyFilteredData.js";
import { getProperty } from "../../repository/property/getProperty.repo.js";

export const getPropertyController = async (c: Context) => {
  const id = c.req.param("id");
  const res = await getProperty(id);
  if ("property" in res) {
    const data = getPropertyFilteredData(res.property as IProperty);
    return c.json({ ...res, property: data }, res.status as StatusCode);
  }
  return c.json(res, res.status as StatusCode);
};
