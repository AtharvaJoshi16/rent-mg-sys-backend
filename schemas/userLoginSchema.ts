import { z } from "zod";
import { messages } from "../constants/validationMessages.js";
import { UserType } from "../interfaces/userType.enum.js";

export const userLoginSchema = z.object({
  email: z.string().email(),
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
  userType: z.enum([UserType.SUPERUSER, UserType.RENTER, UserType.OWNER], {
    message: messages.owner.userType,
  }),
});
