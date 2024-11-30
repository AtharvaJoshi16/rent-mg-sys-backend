import { UserType } from "@prisma/client";
import { Context } from "hono";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter.js";

export const getUserTypesController = (c: Context) => {
  const userTypes = Object.values(UserType).map((type) => ({
    label: capitalizeFirstLetter(type),
    value: type,
  }));

  return c.json(
    {
      status: 200,
      count: userTypes.length,
      userTypes,
    },
    200
  );
};
