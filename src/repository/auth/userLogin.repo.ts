import bcrypt from "bcrypt";
import { errors } from "../../../constants/errors.js";
import { noUserFoundWithEmailAndTypeMessage } from "../../../constants/responseMessages.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { findUser } from "../../../utils/findUser.js";
import { generateToken } from "../../../utils/tokenUtils.js";

export const userLogin = async (
  email: string,
  userType: UserType,
  password: string
) => {
  const user: any = await findUser(email, userType);
  const {
    id,
    firstName,
    lastName,
    isVerified,
    userType: dbUserType,
    profileImage,
    password: dbPassword,
  } = user ?? {};
  if (!user) {
    return {
      status: 404,
      error: noUserFoundWithEmailAndTypeMessage(email, userType),
    };
  }

  if (bcrypt.compareSync(password, dbPassword)) {
    const token = generateToken(email, process.env.USER_LOGIN_EXP_TIME);
    return {
      status: 200,
      token,
      user: {
        id,
        firstName,
        lastName,
        isVerified,
        userType: dbUserType,
        profileImage,
      },
    };
  } else {
    return {
      status: 401,
      error: errors.INVALID_PASSWORD,
    };
  }
};
