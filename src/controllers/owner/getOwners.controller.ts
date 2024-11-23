import { Context } from "hono";
import { getOwners } from "../../repository/owner/getOwners.repo.js";
import { getOwnerFilteredData } from "../../../utils/getOwnerFilteredData.js";
import { StatusCode } from "hono/utils/http-status";
import { Address, EmergencyDetails } from "@prisma/client";

export const getOwnersController = async (c: Context) => {
  const queries = c.get("parsedQueries");
  const res = await getOwners(queries);
  if ("owners" in res) {
    const filteredResponse = res.owners.map((owner) =>
      getOwnerFilteredData(
        owner,
        owner.address as Address,
        owner.emergencyDetails as EmergencyDetails
      )
    );
    return c.json(
      { ...res, owners: filteredResponse },
      res.status as StatusCode
    );
  }
  return c.json(res, res.status as StatusCode);
};
