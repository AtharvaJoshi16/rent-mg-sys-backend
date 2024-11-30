import { PropertyType } from "@prisma/client";
import { Context } from "hono";
import { convertCamelcaseToSentence } from "../../../utils/convertCamelcaseToSentence.js";

export const getPropertyTypesController = (c: Context) => {
  const types = Object.values(PropertyType).map((type) => ({
    label: convertCamelcaseToSentence(type),
    value: type,
  }));

  return c.json(
    {
      status: 200,
      count: types.length,
      propertyTypes: types,
    },
    200
  );
};
