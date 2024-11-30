import { PreferredContactMethod } from "@prisma/client";
import { Context } from "hono";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter.js";

export const getPreferredContactMethodsController = (c: Context) => {
  const contactMethods = Object.values(PreferredContactMethod).map((type) => ({
    label: capitalizeFirstLetter(type),
    value: type,
  }));

  return c.json(
    {
      status: 200,
      count: contactMethods.length,
      contactMethods,
    },
    200
  );
};
