import { Prisma } from "@prisma/client";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import {
  OwnerGetResponse,
  PrismaOwnerData,
} from "../../../interfaces/owner.js";
import { db } from "../../../utils/prismaClient.js";
import { getOwnersFilterConditions } from "../../../utils/getOwnersFilterConditions.js";
import { OwnersGetSchema } from "../../../schemas/ownersGetSchema.js";

export const getOwners = async (queries: OwnersGetSchema) => {
  const whereConditions = getOwnersFilterConditions(queries);
  try {
    const owners = await db.owner.findMany({
      where: whereConditions,
      include: {
        address: true,
        emergencyDetails: true,
        properties: true,
      },
    });
    return {
      status: 200,
      ownersCount: owners.length,
      owners: owners as PrismaOwnerData[],
    };
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
