import { z } from "zod";
import { messages } from "../../constants/validationMessages.js";
import { PreferredContactMethod } from "../../interfaces/preferredContactMethod.enum.js";

const ownerId = z.string().refine(
  (val) => {
    const length = val.toString().length;
    return length === 8;
  },
  {
    message: messages.owner.id,
  }
);

export const ownersGetSchema = z
  .object({
    id: ownerId.transform((val) => parseInt(val)),
    email: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    isVerified: z.string().transform((val) => val === "true"),
    isEmailVerified: z.string().transform((val) => val === "true"),
    lastName: z.string(),
    phone1: z.string(),
    phone2: z.string(),
    aadharId: z.string(),
    panId: z.string(),
    drivingLicenseId: z.string(),
    voterId: z.string(),
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string().transform((val) => parseInt(val)),
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
    edPhone1: z.string(),
    edPhone2: z.string(),
    edEmail: z.string(),
    edFirstName: z.string(),
    edMiddleName: z.string(),
    edLastName: z.string(),
    edRelation: z.string(),
  })
  .partial();

export type OwnersGetSchema = z.infer<typeof ownersGetSchema>;
