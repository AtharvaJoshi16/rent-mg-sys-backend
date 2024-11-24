import { Hono } from "hono";
import { authorizeRoute } from "../../middlewares/auth/authorizeRoute.js";
import { validateOwnerData } from "../../middlewares/owner/ownerCreateData.js";
import { validateOwnerDeleteData } from "../../middlewares/owner/ownerDeleteData.js";
import { validateOwnerGetData } from "../../middlewares/owner/ownerGetData.js";
import { validateGetOwnersData } from "../../middlewares/owner/ownersGetData.js";
import { validateOwnerUpdateData } from "../../middlewares/owner/ownerUpdateData.js";
import { createOwnerController } from "../controllers/owner/createOwner.controller.js";
import { deleteOwnerController } from "../controllers/owner/deleteOwner.controller.js";
import { getOwnerController } from "../controllers/owner/getOwner.controller.js";
import { getOwnersController } from "../controllers/owner/getOwners.controller.js";
import { updateOwnerController } from "../controllers/owner/updateOwner.controller.js";

const ownerRouter = new Hono();

ownerRouter.get(
  "/:id",
  authorizeRoute,
  validateOwnerGetData,
  getOwnerController
);
ownerRouter.get(
  "/",
  authorizeRoute,
  validateGetOwnersData,
  getOwnersController
);
ownerRouter.post("/", validateOwnerData, createOwnerController); //owner create
ownerRouter.put(
  "/",
  authorizeRoute,
  validateOwnerUpdateData,
  updateOwnerController
); //owner update

ownerRouter.delete(
  "/:id",
  authorizeRoute,
  validateOwnerDeleteData,
  deleteOwnerController
);

export { ownerRouter };
