import { PropertyStatus } from "@prisma/client";
import { Context } from "hono";
import { convertCamelcaseToSentence } from "../../../utils/convertCamelcaseToSentence.js";

export const getStatusesController = (c: Context) => {
  const statuses = Object.values(PropertyStatus).map((stat) => ({
    label: convertCamelcaseToSentence(stat),
    value: stat,
  }));

  return c.json(
    {
      status: 200,
      count: statuses.length,
      propertyStatuses: statuses,
    },
    200
  );
};
