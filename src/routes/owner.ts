import { Hono } from "hono";
import { authorizeRoute } from "../../middlewares/auth/authorizeRoute.js";
import { validateOwnerData } from "../../middlewares/owner/ownerCreateData.js";
import { validateOwnerDeleteData } from "../../middlewares/owner/ownerDeleteData.js";
import { validateOwnerGetData } from "../../middlewares/owner/ownerGetData.js";
import { validateGetOwnersData } from "../../middlewares/owner/ownersGetData.js";
import { validateOwnerUpdateData } from "../../middlewares/owner/ownerUpdateData.js";
import { rateLimiterMiddleware } from "../../middlewares/rateLimiter.middleware.js";
import { createOwnerController } from "../controllers/owner/createOwner.controller.js";
import { deleteOwnerController } from "../controllers/owner/deleteOwner.controller.js";
import { getOwnerController } from "../controllers/owner/getOwner.controller.js";
import { getOwnersController } from "../controllers/owner/getOwners.controller.js";
import { updateOwnerController } from "../controllers/owner/updateOwner.controller.js";

const ownerRouter = new Hono();

const rateLimitStore: Record<string, { count: number; expires: number }> = {};

ownerRouter.get(
  "/:id",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validateOwnerGetData,
  getOwnerController
);
ownerRouter.get(
  "/",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validateGetOwnersData,
  getOwnersController
);
ownerRouter.post(
  "/",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  validateOwnerData,
  createOwnerController
); //owner create
ownerRouter.put(
  "/",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validateOwnerUpdateData,
  updateOwnerController
); //owner update

ownerRouter.delete(
  "/:id",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validateOwnerDeleteData,
  deleteOwnerController
);

export { ownerRouter };
