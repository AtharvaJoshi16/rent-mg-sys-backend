import z from "zod";
import { messages } from "../constants/validationMessages.js";
import { PreferredContactMethod } from "../interfaces/preferredContactMethod.enum.js";

export const ownerId = z.number().refine(
  (val) => {
    const length = val.toString().length;
    return length === 8;
  },
  {
    message: messages.owner.id,
  }
);

export const ownerUpdateSchema = z.object({
  id: ownerId,
  email: z.string().email({ message: messages.owner.email }),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  phone1: z.string(),
  phone2: z.string().optional(),
  aadharId: z.string(),
  panId: z.string(),
  drivingLicenseId: z.string().optional(),
  voterId: z.string().optional(),
  aadhar: z.string(),
  pan: z.string(),
  drivingLicense: z.string().optional(),
  voter: z.string().optional(),
  profileImage: z.string().optional(),
  description: z.string().optional(),
  address: z.object({
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.number(),
    electricityBill: z.string().optional(),
    propertyTaxBill: z.string().optional(),
  }),
  preferredContactMethod: z
    .enum(
      [
        PreferredContactMethod.EMAIL,
        PreferredContactMethod.PHONE,
        PreferredContactMethod.ANY,
      ],
      {
        message: messages.owner.preferredContactMethod,
      }
    )
    .optional(),
  preferredLanguage: z.string().optional(),
  emergencyDetails: z.object({
    phone1: z.string(),
    phone2: z.string().optional(),
    email: z.string().email(),
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    relation: z.string(),
  }),
});

export type UpdateOwnerSchema = z.infer<typeof ownerUpdateSchema>;
