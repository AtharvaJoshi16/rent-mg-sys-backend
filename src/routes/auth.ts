import { Hono } from "hono";
import { validateUserLoginData } from "../../middlewares/auth/userLoginData.js";
import { validateEmailVerification } from "../../middlewares/auth/validateEmailVerification.js";
import { validateEmailVerificationSend } from "../../middlewares/auth/validateEmailVerificationSend.js";
import { sendVerificationEmailController } from "../controllers/auth/sendVerificationEmail.controller.js";
import { userLoginController } from "../controllers/auth/userLogin.controller.js";
import { verifyEmailController } from "../controllers/auth/verifyEmail.controller.js";

const authRouter = new Hono();

authRouter.get(
  "/send-verification-email",
  validateEmailVerificationSend,
  sendVerificationEmailController
);
authRouter.post("/login", validateUserLoginData, userLoginController);
authRouter.post("/verify", validateEmailVerification, verifyEmailController);

export { authRouter };
