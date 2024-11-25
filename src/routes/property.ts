import { Hono } from "hono";
import { authorizeRoute } from "../../middlewares/auth/authorizeRoute.js";
import { validatePropertyCreateData } from "../../middlewares/property/propertyCreateData.js";
import { createPropertyController } from "../controllers/property/createProperty.controller.js";

const propertyRouter = new Hono();

propertyRouter.post(
  "/",
  authorizeRoute,
  validatePropertyCreateData,
  createPropertyController
);

export { propertyRouter };
