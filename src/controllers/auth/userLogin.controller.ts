import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { UserType } from "../../../interfaces/userType.enum.js";
import { userLogin } from "../../repository/auth/userLogin.repo.js";

export const userLoginController = async (c: Context) => {
  const data = await c.req.json();
  const { email, password, userType } = data;
  const res = await userLogin(
    email as string,
    userType as UserType,
    password as string
  );
  return c.json(res, res.status as StatusCode);
};
