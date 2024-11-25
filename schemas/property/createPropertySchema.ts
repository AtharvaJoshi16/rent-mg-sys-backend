import { z } from "zod";
import { messages } from "../../constants/validationMessages.js";
import { Preference } from "../../interfaces/preference.enum.js";
import { PropertyType } from "../../interfaces/propertyType.enum.js";
import { RentType } from "../../interfaces/rentType.enum.js";
import { ownerId } from "../owner/ownerBaseSchema.js";

export const createPropertySchema = z.object({
  ownerId,
  name: z.string(),
  address: z.object({
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.number(),
    electricityBill: z.string(),
    propertyTaxBill: z.string(),
  }),
  electricityBillConsumerNo: z.string(),
  propertyTaxId: z.string(),
  type: z.enum(
    [PropertyType.APARTMENT, PropertyType.HOUSE, PropertyType.ROOMS],
    {
      message: messages.property.type,
    }
  ),
  rent: z.number(),
  description: z.string(),
  preferred: z.enum([Preference.FAMILY, Preference.ANY, Preference.BACHELORS], {
    message: messages.property.preferred,
  }),
  photos: z.array(z.string()),
  roomDetails: z.object({
    quantity: z.number(),
    rentType: z.enum([RentType.TOTAL, RentType.PER_PERSON], {
      message: messages.property.roomDetails.rentType,
    }),
    perPersonRent: z.number().optional(),
  }),
});

export type CreatePropertySchema = z.infer<typeof createPropertySchema>;
