import { z } from "zod";
import { messages } from "../../constants/validationMessages.js";
import { PropertyStatus } from "../../interfaces/propertyStatus.enum.js";
import { PropertyType } from "../../interfaces/propertyType.enum.js";
import { ownerId } from "../owner/ownersGetSchema.js";

export const propertiesGetSchema = z
  .object({
    id: z.string(),
    ownerId: ownerId.transform((val) => parseInt(val)),
    isVerified: z.string().transform((val) => val === "true"),
    status: z.enum(
      [
        PropertyStatus.AVAILABLE,
        PropertyStatus.NOT_RENTING_ANYMORE,
        PropertyStatus.PENDING_APPROVAL,
        PropertyStatus.RENTED_OUT,
        PropertyStatus.UNDER_MAINTENANCE,
      ],
      {
        message: messages.property.status,
      }
    ),
    type: z.enum(
      [PropertyType.APARTMENT, PropertyType.HOUSE, PropertyType.ROOMS],
      {
        message: messages.property.type,
      }
    ),
    name: z.string(),
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string().transform((val) => parseInt(val)),
  })
  .partial();

export type PropertiesGetSchema = z.infer<typeof propertiesGetSchema>;
