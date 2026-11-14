import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number."),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.")]),
  interest: z.enum(["Buy", "Sell", "Rent", "Documentation", "Other"]),
  propertyType: z.string().min(1, "Choose a property type."),
  locality: z.string().trim().min(2, "Enter a preferred locality.").max(100),
  budget: z.string().max(40),
  message: z.string().trim().min(10, "Please add a little more detail.").max(1500),
  consent: z.literal(true, { error: "Please confirm that we may contact you." }),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = Omit<z.infer<typeof contactSchema>, "consent"> & { consent: boolean };
