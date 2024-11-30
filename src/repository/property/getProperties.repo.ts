import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { IProperty } from "../../../interfaces/property.js";
import { PropertiesGetSchema } from "../../../schemas/property/propertiesGetSchema.js";
import { getPropertiesFilterConditions } from "../../../utils/getPropertyFilterConditions.js";
import { db } from "../../../utils/prismaClient.js";

export const getProperties = async (queries: PropertiesGetSchema) => {
  const whereConditions = getPropertiesFilterConditions(queries);
  try {
    const properties = await db.property.findMany({
      where: whereConditions,
      include: {
        address: true,
        roomDetails: true,
        renters: true,
      },
    });

    return {
      status: 200,
      propertiesCount: properties.length,
      properties: properties as IProperty[],
    };
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
