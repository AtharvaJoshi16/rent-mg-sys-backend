import z from "zod";
import { messages } from "../constants/validationMessages.js";
import { PreferredContactMethod } from "../interfaces/preferredContactMethod.enum.js";
import { ownerId } from "./ownerBaseSchema.js";

const emptyValues = [undefined, null, ""];
const { emptyCheck } = messages;

export const ownerUpdateSchema = z
  .object({
    email: z
      .string()
      .email({ message: messages.owner.email })
      .refine((value) => !emptyValues.includes(value), {
        message: emptyCheck("Email"),
      }),
    firstName: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("Firstname"),
    }),
    middleName: z.string(),
    lastName: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("Lastname"),
    }),
    phone1: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("Phone1"),
    }),
    phone2: z.string(),
    aadharId: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("AadharId"),
    }),
    panId: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("PanId"),
    }),
    drivingLicenseId: z.string(),
    voterId: z.string(),
    aadhar: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("Aadhar"),
    }),
    pan: z.string().refine((value) => !emptyValues.includes(value), {
      message: emptyCheck("Pan"),
    }),
    drivingLicense: z.string(),
    voter: z.string(),
    profileImage: z.string(),
    description: z.string(),
    address: z
      .object({
        addressLine: z
          .string()
          .refine((value) => !emptyValues.includes(value), {
            message: emptyCheck("AddressLine"),
          }),
        city: z.string().refine((value) => !emptyValues.includes(value), {
          message: emptyCheck("City"),
        }),
        state: z.string().refine((value) => !emptyValues.includes(value), {
          message: emptyCheck("State"),
        }),
        pincode: z
          .number()
          .refine((value) => !emptyValues.includes(value.toString()), {
            message: emptyCheck("Pincode"),
          }),
        electricityBill: z.string(),
        propertyTaxBill: z.string(),
      })
      .partial(),
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
    emergencyDetails: z
      .object({
        phone1: z.string().refine((value) => !emptyValues.includes(value), {
          message: emptyCheck("Phone1"),
        }),
        phone2: z.string(),
        email: z.string().email(),
        firstName: z.string().refine((value) => !emptyValues.includes(value), {
          message: emptyCheck("Firstname"),
        }),
        middleName: z.string(),
        lastName: z.string().refine((value) => !emptyValues.includes(value), {
          message: emptyCheck("Lastname"),
        }),
        relation: z.string().refine((value) => !emptyValues.includes(value), {
          message: emptyCheck("Relation"),
        }),
      })
      .partial(),
  })
  .partial()
  .merge(
    z.object({
      id: ownerId,
    })
  )
  .refine(
    (data) => {
      return !(!!data.id && Object.keys(data).length === 1);
    },
    {
      message: messages.noDataProvided,
    }
  );

export type UpdateOwnerSchema = z.infer<typeof ownerUpdateSchema>;
