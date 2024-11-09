import { Context } from "hono";
import {
  emailConfirmation,
  noUserFoundWithEmailAndTypeMessage,
  responses,
  userAlreadyVerified,
} from "../../../constants/responseMessages.js";
import { emailData } from "../../../constants/verificationEmail.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { findUser } from "../../../utils/findUser.js";
import { generateToken } from "../../../utils/tokenUtils.js";
import { transporter } from "../../../utils/transporter.js";

export const sendVerificationEmailController = async (c: Context) => {
  const email = c.req.query("email")!;
  const userType = c.req.query("userType")!;
  const verificationLink = c.req.query("verificationLink")!;
  const user: any = await findUser(email, userType as UserType);

  if (!user) {
    return c.json(
      {
        error: noUserFoundWithEmailAndTypeMessage(email, userType as UserType),
      },
      404
    );
  }
  if (user?.isEmailVerified) {
    return c.json(
      {
        message: userAlreadyVerified(email, userType as UserType),
      },
      200
    );
  } else {
    const token = generateToken(email);

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: emailData.subject,
        html: emailData.html(
          `${user?.firstName} ${user?.lastName}`,
          `${verificationLink}?token=${token}`
        ),
      });
      console.log(info.response);
      return c.json(
        {
          message: emailConfirmation(email),
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          error: responses.UNKNOWN,
        },
        500
      );
    }
  }
};
