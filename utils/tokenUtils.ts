import jwt from "jsonwebtoken";
import { errors } from "../constants/errors.js";
import { VerifyTokenResponse } from "../interfaces/verifyTokenResponse.js";

export const generateToken = (email: string, expirationTime = "15m") => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });
};

export const verifyToken = (token: string): VerifyTokenResponse | void => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if (err) {
        if (
          ["JsonWebTokenError", "TokenExpiredError"].includes(err?.name) ||
          err?.message === "invalid signature"
        ) {
          return {
            error: errors.INVALID_TOKEN_ERROR,
            status: 400,
          };
        }
      }
      return { info, verified: true };
    });
  } catch (err) {
    console.log(err);
    return {
      error: errors.INTERNAL_SERVER_ERROR,
      status: 500,
    };
  }
};
