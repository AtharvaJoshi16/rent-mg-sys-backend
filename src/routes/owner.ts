import { Hono } from "hono";
import { authorizeRoute } from "../../middlewares/authorizeRoute.js";
import { validateOwnerData } from "../../middlewares/ownerCreateData.js";
import { validateOwnerGetData } from "../../middlewares/ownerGetData.js";
import { validateOwnerUpdateData } from "../../middlewares/ownerUpdateData.js";
import { createOwnerController } from "../controllers/owner/createOwner.controller.js";
import { getOwnerController } from "../controllers/owner/getOwner.controller.js";
import { updateOwnerController } from "../controllers/owner/updateOwner.controller.js";
import { getOwnersController } from "../controllers/owner/getOwners.controller.js";
import { validateGetOwnersData } from "../../middlewares/ownersGetData.js";
import { validateOwnerDeleteData } from "../../middlewares/ownerDeleteData.js";
import { deleteOwnerController } from "../controllers/owner/deleteOwner.controller.js";

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
