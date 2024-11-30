import { Hono } from "hono";
import { authorizeRoute } from "../../middlewares/auth/authorizeRoute.js";
import { validateUserLoginData } from "../../middlewares/auth/userLoginData.js";
import { validateEmailVerification } from "../../middlewares/auth/validateEmailVerification.js";
import { validateEmailVerificationSend } from "../../middlewares/auth/validateEmailVerificationSend.js";
import { rateLimiterMiddleware } from "../../middlewares/rateLimiter.middleware.js";
import { getUserTypesController } from "../controllers/auth/getUserTypes.controller.js";
import { sendVerificationEmailController } from "../controllers/auth/sendVerificationEmail.controller.js";
import { userLoginController } from "../controllers/auth/userLogin.controller.js";
import { verifyEmailController } from "../controllers/auth/verifyEmail.controller.js";

const authRouter = new Hono();

const rateLimitStore: Record<string, { count: number; expires: number }> = {};

authRouter.get(
  "/send-verification-email",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  validateEmailVerificationSend,
  sendVerificationEmailController
);
authRouter.post(
  "/login",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  validateUserLoginData,
  userLoginController
);
authRouter.post(
  "/verify",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  validateEmailVerification,
  verifyEmailController
);

authRouter.get(
  "/userTypes",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  getUserTypesController
);

export { authRouter };
