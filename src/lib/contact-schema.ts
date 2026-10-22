import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "name must be at least 2 characters." }).max(100, { message: "name is too long." }),
  email: z.string().trim().email().max(254),
  message: z
    .string()
    .trim()
    .min(20, { message: "message must be at least 20 characters." })
    .max(5000, { message: "message must be at most 5000 characters." }),
});

export type ContactValues = z.infer<typeof contactSchema>;
