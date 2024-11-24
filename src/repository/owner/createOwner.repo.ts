import { Address, EmergencyDetails } from "@prisma/client";
import {
  creationSuccessMessage,
  userAlreadyExists,
} from "../../../constants/responseMessages.js";
import { emailData } from "../../../constants/verificationEmail.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import type { CustomResponse } from "../../../interfaces/responses.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { CreateOwnerSchema } from "../../../schemas/owner/ownerCreateSchema.js";
import { findUser } from "../../../utils/findUser.js";
import { db } from "../../../utils/prismaClient.js";
import { serializeOwnerCreateData } from "../../../utils/serializeOwnerCreateData.js";
import { generateToken } from "../../../utils/tokenUtils.js";
import { transporter } from "../../../utils/transporter.js";

export const createOwner = async (
  data: CreateOwnerSchema,
  emailVerificationLink: string
): Promise<CustomResponse> => {
  const formattedData = serializeOwnerCreateData(data);
  const {
    aadharId,
    aadhar,
    voter,
    voterId,
    drivingLicense,
    drivingLicenseId,
    description,
    pan,
    panId,
    address,
    emergencyDetails,
    preferredContactMethod,
    preferredLanguage,
  } = formattedData.owner;

  const { email, userType, firstName, lastName } = formattedData.user;

  try {
    const owner = await findUser(email, userType);
    if (owner) {
      return {
        status: 409,
        message: userAlreadyExists(email, userType as UserType),
      };
    }
    await db.user.create({
      data: {
        ...formattedData.user,
        owner: {
          create: {
            aadharId,
            aadhar,
            voter,
            voterId,
            drivingLicense,
            drivingLicenseId,
            description,
            pan,
            panId,
            address: {
              create: { ...(address as Address) },
            },
            emergencyDetails: {
              create: { ...(emergencyDetails as EmergencyDetails) },
            },
            preferredContactMethod,
            preferredLanguage,
          },
        },
      },
    });

    const token = generateToken(email);

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: emailData.subject,
      html: emailData.html(
        `${firstName} ${lastName}`,
        `${emailVerificationLink}?token=${token}`
      ),
    });
    console.info(info.response);

    return {
      status: 201,
      message: creationSuccessMessage({
        email: email,
        userType: userType,
      }),
    };
  } catch (e) {
    console.log(e);
    return prismaErrorHandler(e as Error);
  }
};
