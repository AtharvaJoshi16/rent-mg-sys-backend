import { PropertyStatus } from "@prisma/client";
import {
  activeUserCannotActionMsg,
  hasActivePropertiesMessage,
  noOwnerFoundWithId,
  ownerDeleteMessage,
} from "../../../constants/responseMessages.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { IOwnerDelete } from "../../../interfaces/owner.js";
import { db } from "../../../utils/prismaClient.js";

export const deleteOwner = async (
  ownerId: number,
  activeUserEmail: string
): Promise<IOwnerDelete> => {
  try {
    return await db.$transaction(async (tx) => {
      const ownerData = await tx.user.findFirst({
        where: { id: ownerId },
        include: {
          owner: {
            include: {
              properties: true,
            },
          },
        },
      });
      if (!ownerData) {
        return {
          status: 404,
          message: noOwnerFoundWithId(ownerId),
        };
      }

      if (ownerData?.email !== activeUserEmail) {
        return {
          status: 422,
          message: activeUserCannotActionMsg(ownerId, "delete"),
        };
      }

      if (!!ownerData.owner?.properties.length) {
        const hasActiveProperties = ownerData.owner.properties.some(
          (prop) => prop.status !== PropertyStatus.notRentingAnymore
        );
        if (hasActiveProperties) {
          return {
            status: 422,
            message: hasActivePropertiesMessage(ownerId),
          };
        }
      }

      await tx.user.delete({
        where: { id: ownerId },
      });
      return {
        status: 201,
        message: ownerDeleteMessage(ownerId),
        affected: {
          properties: ownerData.owner?.properties
            .filter((prop) => prop.status !== PropertyStatus.notRentingAnymore)
            .map((prop) => prop.id),
        },
      };
    });
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
