import { Prisma } from "@prisma/client";
import { prismaErrorCodes } from "../../../constants/errorCodes.js";
import {
  activeUserCannotActionMsg,
  alreadyInUse,
  responses,
  updateSuccessMessage,
} from "../../../constants/responseMessages.js";
import { emailData } from "../../../constants/verificationEmail.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { CustomResponse } from "../../../interfaces/responses.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { UpdateOwnerSchema } from "../../../schemas/ownerUpdateSchema.js";
import { filterPayload } from "../../../utils/filterData.js";
import {
  filterAddressPayload,
  filterEmergencyDetailsPayload,
} from "../../../utils/filterPayloads.js";
import { findUser } from "../../../utils/findUser.js";
import { db } from "../../../utils/prismaClient.js";
import { generateToken } from "../../../utils/tokenUtils.js";
import { transporter } from "../../../utils/transporter.js";

export const updateOwner = async (
  data: UpdateOwnerSchema,
  verificationLink: string,
  activeUserEmail: string
): Promise<CustomResponse> => {
  const payload = { ...data };
  const filteredPayload = filterPayload(payload);
  const { address, emergencyDetails, phone1, phone2, email } = filteredPayload;

  const user: any = await findUser(email!, UserType.OWNER);
  const isEmailUpdated = !!email && user?.email !== email;

  if (user?.email !== activeUserEmail) {
    return {
      status: 422,
      message: activeUserCannotActionMsg(user?.id, "update"),
    };
  }

  try {
    await db.$transaction(
      async (tx) => {
        if (!!email) {
          const existingOwnerWithEmail = await tx.owner.findUnique({
            where: {
              email: email,
            },
          });

          if (existingOwnerWithEmail) {
            throw new Prisma.PrismaClientKnownRequestError(
              alreadyInUse("Email"),
              {
                code: prismaErrorCodes.UNIQUE_CONSTRAINT,
                clientVersion: "custom",
                meta: {
                  modelName: "Owner",
                  target: "email",
                },
              }
            );
          }
        }
        if (!!phone1) {
          const existingOwnerWithPhone1 = await tx.owner.findUnique({
            where: {
              phone1: phone1,
            },
          });

          if (existingOwnerWithPhone1) {
            throw new Prisma.PrismaClientKnownRequestError(
              alreadyInUse("Phone1"),
              {
                code: prismaErrorCodes.UNIQUE_CONSTRAINT,
                clientVersion: "custom",
                meta: {
                  modelName: "Owner",
                  target: "phone1",
                },
              }
            );
          }
        }
        if (!!phone2) {
          const existingOwnerWithPhone2 = await tx.owner.findUnique({
            where: {
              phone2: phone2,
            },
          });

          if (existingOwnerWithPhone2) {
            throw new Prisma.PrismaClientKnownRequestError(
              alreadyInUse("Phone2"),
              {
                code: prismaErrorCodes.UNIQUE_CONSTRAINT,
                clientVersion: "custom",
                meta: {
                  modelName: "Owner",
                  target: "phone2",
                },
              }
            );
          }
        }

        await db.owner.update({
          where: {
            id: data.id,
          },
          data: {
            ...filteredPayload,
            ...(isEmailUpdated && {
              isEmailVerified: false,
            }),
            address: {
              update: {
                ...filterAddressPayload(address),
              },
            },
            emergencyDetails: {
              update: {
                ...filterEmergencyDetailsPayload(emergencyDetails),
              },
            },
          },
        });
      },
      { timeout: 20000 }
    );

    if (isEmailUpdated) {
      const token = generateToken(email!);

      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: emailData.subject,
        html: emailData.html(
          `${payload.firstName} ${payload.lastName}`,
          `${verificationLink}?token=${token}`
        ),
      });
      console.info(info.response);
    }

    return {
      status: 201,
      message: isEmailUpdated
        ? updateSuccessMessage({
            email: payload.email!,
            userType: UserType.OWNER,
          })
        : responses.USER_UPDATED,
    };
  } catch (e) {
    console.info(e);
    return prismaErrorHandler(e as Error);
  }
};
