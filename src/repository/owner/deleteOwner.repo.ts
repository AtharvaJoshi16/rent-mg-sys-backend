import { PropertyStatus } from "@prisma/client";
import {
  activeUserCannotActionMsg,
  hasActivePropertiesMessage,
  noOwnerFoundWithId,
  ownerDeleteMessage,
} from "../../../constants/responseMessages.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { db } from "../../../utils/prismaClient.js";
import { IOwnerDelete } from "../../../interfaces/owner.js";

export const deleteOwner = async (
  ownerId: number,
  activeUserEmail: string
): Promise<IOwnerDelete> => {
  try {
    return await db.$transaction(async (tx) => {
      const owner = await tx.owner.findFirst({
        where: { id: ownerId },
        include: {
          properties: true,
        },
      });

      if (!owner) {
        return {
          status: 404,
          message: noOwnerFoundWithId(ownerId),
        };
      }

      if (owner?.email !== activeUserEmail) {
        return {
          status: 422,
          message: activeUserCannotActionMsg(ownerId, "delete"),
        };
      }

      if (!!owner.properties.length) {
        const hasActiveProperties = owner.properties.some(
          (prop) => prop.status !== PropertyStatus.notRentingAnymore
        );
        if (hasActiveProperties) {
          return {
            status: 422,
            message: hasActivePropertiesMessage(ownerId),
          };
        }
      }

      await tx.owner.delete({
        where: { id: ownerId },
      });
      return {
        status: 201,
        message: ownerDeleteMessage(ownerId),
        affected: {
          properties: owner.properties
            .filter((prop) => prop.status !== PropertyStatus.notRentingAnymore)
            .map((prop) => prop.id),
        },
      };
    });
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
