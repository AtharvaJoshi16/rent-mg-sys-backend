import { UserType } from "@prisma/client";
import bcrypt from "bcrypt";
import { creationSuccessMessage } from "../../constants/responseMessages.js";
import { emailData } from "../../constants/verificationEmail.js";
import { prismaErrorHandler } from "../../handlers/prismaErrorHandler.js";
import { PrismaOwnerData } from "../../interfaces/owner.js";
import type { CustomCreateResponse } from "../../interfaces/responses.js";
import { generateId } from "../../utils/generateId.js";
import { db } from "../../utils/prismaClient.js";
import { generateToken } from "../../utils/tokenUtils.js";
import { transporter } from "../../utils/transporter.js";

export const createOwner = async (
  data: PrismaOwnerData,
  emailVerificationLink: string
): Promise<CustomCreateResponse> => {
  const newId = generateId();
  const formattedData = { ...data };
  const { address, emergencyDetails } = formattedData;
  formattedData.id = newId;
  address!.ownerId = newId;
  emergencyDetails!.ownerId = newId;
  formattedData.isEmailVerified = false;
  formattedData.isVerified = false;
  formattedData.userType = UserType.owner;
  formattedData.password = bcrypt.hashSync(formattedData.password, 10);
  try {
    await db.owner.create({
      data: {
        ...formattedData,
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

    const token = generateToken(formattedData.email);

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: formattedData.email,
      subject: emailData.subject,
      html: emailData.html(
        `${formattedData.firstName} ${formattedData.lastName}`,
        `${emailVerificationLink}?token=${token}`
      ),
    });
    console.info(info.response);

    return {
      status: 201,
      message: creationSuccessMessage({
        email: formattedData.email,
        userType: formattedData.userType,
      }),
    };
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
