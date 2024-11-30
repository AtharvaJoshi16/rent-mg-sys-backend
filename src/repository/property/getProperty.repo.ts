import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { IProperty } from "../../../interfaces/property.js";
import { db } from "../../../utils/prismaClient.js";

export const getProperty = async (id: string) => {
  try {
    const property = await db.property.findFirst({
      where: {
        id,
      },
      include: {
        renters: true,
        roomDetails: true,
        address: true,
      },
    });

    return {
      status: 200,
      property: property as IProperty,
    };
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
