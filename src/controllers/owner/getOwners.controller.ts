import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { getOwnerFilteredData } from "../../../utils/getOwnerFilteredData.js";
import { getOwners } from "../../repository/owner/getOwners.repo.js";

export const getOwnersController = async (c: Context) => {
  const queries = c.get("parsedQueries");
  const res = await getOwners(queries);
  if ("owners" in res) {
    const filteredResponse = res.owners.map((owner) =>
      getOwnerFilteredData(owner)
    );
    return c.json(
      { ...res, owners: filteredResponse },
      res.status as StatusCode
    );
  }
  return c.json(res, res.status as StatusCode);
};
