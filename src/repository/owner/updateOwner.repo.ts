import { Prisma, UserType as PrismaUserType } from "@prisma/client";
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
import { UpdateOwnerSchema } from "../../../schemas/owner/ownerUpdateSchema.js";
import { filterPayload } from "../../../utils/filterData.js";
import { findUser } from "../../../utils/findUser.js";
import { db } from "../../../utils/prismaClient.js";
import { serializeOwnerUpdateData } from "../../../utils/serializeOwnerUpdateData.js";
import { generateToken } from "../../../utils/tokenUtils.js";
import { transporter } from "../../../utils/transporter.js";

export const updateOwner = async (
  data: UpdateOwnerSchema,
  verificationLink: string,
  activeUserEmail: string
): Promise<CustomResponse> => {
  const payload = { ...data };
  const serializedOwnerUpdateData = serializeOwnerUpdateData(payload);
  const filteredUserData = filterPayload(serializedOwnerUpdateData.user);
  const filteredOwnerData = filterPayload(serializedOwnerUpdateData.owner);

  const { phone1, phone2, email, id, firstName, lastName, middleName } =
    filteredUserData ?? {};
  const { address, emergencyDetails } = filteredOwnerData ?? {};

  const user: any = await findUser(email!, UserType.OWNER);
  const isEmailUpdated =
    (!user?.email && !!email) || (!!user?.email && user?.email !== email);

  if (!!user?.email && user?.email !== activeUserEmail) {
    return {
      status: 422,
      message: activeUserCannotActionMsg(user?.id, "update"),
    };
  }

  try {
    await db.$transaction(
      async (tx) => {
        console.log(id, isEmailUpdated);
        if (!!email) {
          const existingOwnerWithEmail = await tx.user.findUnique({
            where: {
              email: email,
              userType: PrismaUserType.owner,
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
          const existingOwnerWithPhone1 = await tx.user.findUnique({
            where: {
              phone1,
              userType: PrismaUserType.owner,
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
          const existingOwnerWithPhone2 = await tx.user.findUnique({
            where: {
              phone2,
              userType: PrismaUserType.owner,
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
        await tx.user.update({
          where: {
            id,
          },
          data: {
            ...(isEmailUpdated && {
              isEmailVerified: false,
            }),
            ...filteredUserData,
            owner: {
              update: {
                ...filteredOwnerData,
                address: {
                  update: {
                    ...address,
                  },
                },
                emergencyDetails: {
                  update: {
                    ...emergencyDetails,
                  },
                },
              },
            },
          },
        });
      },
      { timeout: 600000 }
    );

    if (isEmailUpdated) {
      const token = generateToken(email!);

      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: emailData.subject,
        html: emailData.html(
          `${firstName} ${lastName}`,
          `${verificationLink}?token=${token}`
        ),
      });
      console.info(info.response);
    }

    return {
      status: 201,
      message: isEmailUpdated
        ? updateSuccessMessage({
            email: email!,
            userType: UserType.OWNER,
          })
        : responses.USER_UPDATED,
    };
  } catch (e) {
    console.info(e);
    return prismaErrorHandler(e as Error);
  }
};
