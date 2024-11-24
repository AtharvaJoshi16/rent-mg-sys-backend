import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { params } from "../../../constants/queryParams/commonParams.js";
import { userAlreadyVerified } from "../../../constants/responseMessages.js";
import { UserType } from "../../../interfaces/userType.enum.js";
import { VerifyTokenResponse } from "../../../interfaces/verifyTokenResponse.js";
import { findUser } from "../../../utils/findUser.js";
import { verifyToken } from "../../../utils/tokenUtils.js";
import { verifyEmail } from "../../repository/auth/verifyEmail.repo.js";

export const verifyEmailController = async (c: Context) => {
  const token = c.req.query(params.token);
  const userType = c.req.query(params.userType);
  const data = verifyToken(token!) as VerifyTokenResponse;
  const user: any = await findUser(data.info?.email!, userType as UserType);
  if (data.verified) {
    if (user?.isEmailVerified) {
      return c.json({
        status: 200,
        message: userAlreadyVerified(data.info?.email!, userType as UserType),
      });
    }
    const res = await verifyEmail(data.info?.email!, userType as UserType);
    return c.json(res, res.status as StatusCode);
  } else {
    return c.json(data);
  }
};
