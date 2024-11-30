import { Hono } from "hono";
import { authorizeRoute } from "../../middlewares/auth/authorizeRoute.js";
import { validatePropertiesGetData } from "../../middlewares/property/propertiesGetData.js";
import { validatePropertyCreateData } from "../../middlewares/property/propertyCreateData.js";
import { validatePropertyGetData } from "../../middlewares/property/propertyGetData.js";
import { rateLimiterMiddleware } from "../../middlewares/rateLimiter.middleware.js";
import { createPropertyController } from "../controllers/property/createProperty.controller.js";
import { getPreferencesController } from "../controllers/property/getPreferences.controller.js";
import { getPropertiesController } from "../controllers/property/getProperties.controller.js";
import { getPropertyController } from "../controllers/property/getProperty.controller.js";
import { getPropertyTypesController } from "../controllers/property/getPropertyTypes.controller.js";
import { getStatusesController } from "../controllers/property/getStatuses.controller.js";

const propertyRouter = new Hono();

const rateLimitStore: Record<string, { count: number; expires: number }> = {};

propertyRouter.post(
  "/",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validatePropertyCreateData,
  createPropertyController
);

propertyRouter.get(
  "/statuses",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  getStatusesController
);

propertyRouter.get(
  "/propertyTypes",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  getPropertyTypesController
);

propertyRouter.get(
  "/preferences",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  getPreferencesController
);

propertyRouter.get(
  "/:id",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validatePropertyGetData,
  getPropertyController
);

propertyRouter.get(
  "/",
  rateLimiterMiddleware(10, 60000, rateLimitStore),
  authorizeRoute,
  validatePropertiesGetData,
  getPropertiesController
);

export { propertyRouter };
