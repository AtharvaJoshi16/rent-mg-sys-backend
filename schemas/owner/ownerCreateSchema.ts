import z from "zod";
import { messages } from "../../constants/validationMessages.js";
import { PreferredContactMethod } from "../../interfaces/preferredContactMethod.enum.js";

export const ownerCreateSchema = z.object({
  email: z.string().email({ message: messages.owner.email }),
  password: z
    .string()
    .min(10, {
      message: messages.owner.password.length,
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: messages.owner.password.uppercase,
    })
    .refine((val) => /[0-9]/.test(val), {
      message: messages.owner.password.digit,
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: messages.owner.password.special,
    }),
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
// TODO: Below validation will be added for Update Schema
//   })
//   .refine(
//     (data) =>
//       data.address.ownerId || data.address.propertyId || data.address.renterId,
//     {
//       message:
//         "Either of the field values must be provided among Owner ID, Property ID and Renter ID in address",
//       path: ["ownerId", "renterId", "propertyId"],
//     }
//   )
//   .refine(
//     (data) => data.emergencyDetails.ownerId || data.emergencyDetails.renterId,
//     {
//       message:
//         "Either of the field values must be provided among Owner ID and Renter ID in emergency details",
//       path: ["ownerId", "renterId"],
//     }
//   );

export type CreateOwnerSchema = z.infer<typeof ownerCreateSchema>;
