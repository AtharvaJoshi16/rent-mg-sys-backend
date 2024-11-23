import { z } from "zod";
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

export const ownerBaseSchema = z.object({
  id: ownerId,
  email: z.string().email({ message: messages.owner.email }),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  phone1: z.string(),
  phone2: z.string(),
  aadharId: z.string(),
  panId: z.string(),
  drivingLicenseId: z.string(),
  voterId: z.string(),
  aadhar: z.string(),
  pan: z.string(),
  drivingLicense: z.string(),
  voter: z.string(),
  profileImage: z.string(),
  description: z.string(),
  address: z.object({
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.number(),
    electricityBill: z.string(),
    propertyTaxBill: z.string(),
  }),
  preferredContactMethod: z.enum(
    [
      PreferredContactMethod.EMAIL,
      PreferredContactMethod.PHONE,
      PreferredContactMethod.ANY,
    ],
    {
      message: messages.owner.preferredContactMethod,
    }
  ),
  preferredLanguage: z.string(),
  emergencyDetails: z.object({
    phone1: z.string(),
    phone2: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    relation: z.string(),
  }),
});
