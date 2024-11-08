import { Hono } from "hono";
import { validateOwnerData } from "../../middlewares/ownerData.js";
import { createOwnerController } from "../controllers/owner/createOwner.controller.js";

const ownerRouter = new Hono();

ownerRouter.post("/", validateOwnerData, createOwnerController);

export { ownerRouter };
