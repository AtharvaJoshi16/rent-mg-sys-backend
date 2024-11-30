import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { IProperty } from "../../../interfaces/property.js";
import { getPropertyFilteredData } from "../../../utils/getPropertyFilteredData.js";
import { getProperties } from "../../repository/property/getProperties.repo.js";

export const getPropertiesController = async (c: Context) => {
  const queries = c.get("parsedQueries");
  const res = await getProperties(queries);
  if ("properties" in res) {
    const data = res.properties.map((prop) =>
      getPropertyFilteredData(prop as Partial<IProperty>)
    );
    return c.json({ ...res, properties: data }, res.status as StatusCode);
  }
  return c.json(res, res.status as StatusCode);
};
