import { Address, EmergencyDetails } from "@prisma/client";
import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { getOwnerFilteredData } from "../../../utils/getOwnerFilteredData.js";
import { getOwner } from "../../repository/owner/getOwner.repo.js";

export const getOwnerController = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  const res = await getOwner(id);
  if ("owner" in res) {
    const filteredOwnerData = getOwnerFilteredData(
      res.owner,
      res.owner.address as Address,
      res.owner.emergencyDetails as EmergencyDetails
    );
    return c.json(
      { ...res, owner: filteredOwnerData },
      res.status as StatusCode
    );
  }
  return c.json(res, res.status as StatusCode);
};
