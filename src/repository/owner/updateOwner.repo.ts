import {
  responses,
  updateSuccessMessage,
} from "../../../constants/responseMessages.js";
import { emailData } from "../../../constants/verificationEmail.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { PrismaOwnerData } from "../../../interfaces/owner.js";
import { CustomCreateResponse } from "../../../interfaces/responses.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { findUser } from "../../../utils/findUser.js";
import { db } from "../../../utils/prismaClient.js";
import { generateToken } from "../../../utils/tokenUtils.js";
import { transporter } from "../../../utils/transporter.js";

export const updateOwner = async (
  data: PrismaOwnerData,
  verificationLink: string
): Promise<CustomCreateResponse> => {
  const formattedData = { ...data };
  const { address, emergencyDetails } = formattedData;
  const { email } = formattedData;
  address!.ownerId = data.id;
  emergencyDetails!.ownerId = data.id;

  const user: any = await findUser(email, UserType.OWNER);
  const isEmailUpdated = user?.email !== email;

  try {
    await db.owner.update({
      where: {
        id: data.id,
      },
      data: {
        ...formattedData,
        isEmailVerified: false,
        address: {
          create: {
            addressLine: address?.addressLine as string,
            city: address?.city as string,
            pincode: address?.pincode as number,
            state: address?.state as string,
            electricityBill: address?.electricityBill,
            propertyTaxBill: address?.propertyTaxBill,
          },
        },
        emergencyDetails: {
          create: {
            phone1: emergencyDetails?.phone1 as string,
            email: emergencyDetails?.email as string,
            firstName: emergencyDetails?.firstName as string,
            lastName: emergencyDetails?.lastName as string,
            relation: emergencyDetails?.relation as string,
          },
        },
      },
    });

    if (isEmailUpdated) {
      const token = generateToken(email);

      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: emailData.subject,
        html: emailData.html(
          `${formattedData.firstName} ${formattedData.lastName}`,
          `${verificationLink}?token=${token}`
        ),
      });
      console.info(info.response);
    }

    return {
      status: 201,
      message: isEmailUpdated
        ? updateSuccessMessage({
            email: formattedData.email,
            userType: formattedData.userType,
          })
        : responses.USER_UPDATED,
    };
  } catch (e) {
    console.log(e);
    return prismaErrorHandler(e as Error);
  }
};
