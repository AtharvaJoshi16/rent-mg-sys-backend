import { UserType } from "@prisma/client";
import { responses } from "../../../constants/responseMessages.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { CustomResponse } from "../../../interfaces/responses.js";
import { CreatePropertySchema } from "../../../schemas/property/createPropertySchema.js";
import { filterPayload } from "../../../utils/filterData.js";
import { findUser } from "../../../utils/findUser.js";
import { db } from "../../../utils/prismaClient.js";

export const createProperty = async (
  payload: CreatePropertySchema,
  email: string
): Promise<CustomResponse> => {
  const filteredPayload = filterPayload(payload);
  const { address, roomDetails, propertyTaxId, electricityBillConsumerNo } =
    filteredPayload;
  const filteredAddress = filterPayload(address);
  const filteredRoomDetails = filterPayload(roomDetails);

  try {
    const user = await findUser(email, UserType.owner);
    if (user?.id !== filteredPayload.ownerId) {
      return {
        status: 401,
        message: responses.property.activeUserCannotActionMsg(
          user?.id,
          filteredPayload.ownerId
        ),
      };
    }
    return await db.$transaction(async (tx) => {
      const property = await tx.property.findUnique({
        where: {
          propertyTaxId,
          electricityBillConsumerNo,
        },
      });

      if (!!property) {
        return {
          status: 409,
          message: responses.property.alreadyExistsMessage(
            electricityBillConsumerNo,
            propertyTaxId
          ),
        };
      }

      await tx.property.create({
        data: {
          ...filteredPayload,
          address: {
            create: {
              ...filteredAddress,
            },
          },
          roomDetails: {
            create: {
              ...filteredRoomDetails,
            },
          },
        },
      });

      return {
        status: 201,
        message: responses.property.propertyCreated(filteredPayload.ownerId),
      };
    });
  } catch (e) {
    console.log(e);
    return prismaErrorHandler(e as Error);
  }
};
