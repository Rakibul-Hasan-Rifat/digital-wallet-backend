import z from "zod";

export const userZodSchemaToCreate = z.object({
  name: z
    .string({ message: "Name must be string" })
    .max(25, { message: "Max length is 25" })
    .min(3, { message: "Min length is 3" }),
  email: z.email({message: "Email is invalid!"}),
  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message:
        "Only Bangladeshi format is allowed (01XXXXXXXXX | +8801XXXXXXXXX).",
    }),
  password: z.string()
    .min(8, { message: "Password must contain at least 8 characters" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must have at least 1 lowercase letter.",
    })
    .regex(/^(?=.*\d)/, { message: "Passowrd must have at least 1 digit" })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must have at least 1 special character",
    }).optional(),
});
