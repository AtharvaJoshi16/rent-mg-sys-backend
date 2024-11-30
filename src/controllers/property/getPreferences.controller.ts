import { Preference } from "@prisma/client";
import { Context } from "hono";
import { convertCamelcaseToSentence } from "../../../utils/convertCamelcaseToSentence.js";

export const getPreferencesController = (c: Context) => {
  const preferences = Object.values(Preference).map((type) => ({
    label: convertCamelcaseToSentence(type),
    value: type,
  }));

  return c.json(
    {
      status: 200,
      count: preferences.length,
      propertyTypes: preferences,
    },
    200
  );
};
