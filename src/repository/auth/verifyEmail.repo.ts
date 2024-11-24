import { responses } from "../../../constants/responseMessages.js";
import { prismaErrorHandler } from "../../../handlers/prismaErrorHandler.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { db } from "../../../utils/prismaClient.js";

export const verifyEmail = async (email: string, userType: UserType) => {
  try {
    await db.user.update({
      where: {
        email,
        userType,
      },
      data: {
        isEmailVerified: true,
      },
    });

    return {
      status: 201,
      message: responses.EMAIL_VERIFICATION_SUCCESS,
    };
  } catch (e) {
    return prismaErrorHandler(e as Error);
  }
};
