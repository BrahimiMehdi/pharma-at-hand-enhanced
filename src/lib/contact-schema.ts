import * as z from "zod";

// Shared by the contact form (client) and /api/contact (server) so both enforce the same rules.

export const CONTACT_TOPICS = ["resource", "broken-link", "partnership", "other"] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const TOPIC_LABELS: Record<ContactTopic, string> = {
  resource: "Suggest a resource",
  "broken-link": "Report a broken link",
  partnership: "Club or partnership",
  other: "Something else",
};

export const NAME_MAX = 80;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;
// Letters in any script plus spaces, hyphens, apostrophes and dots. Built with RegExp because the TS target predates the `u` flag.
const NAME_PATTERN = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M}' .-]*$", "u");

export const contactSchema = z.object({
  topic: z.enum(CONTACT_TOPICS, { errorMap: () => ({ message: "Choose what your message is about." }) }),
  name: z
    .string({ required_error: "Enter your name." })
    .trim()
    .min(2, { message: "Your name needs at least 2 characters." })
    .max(NAME_MAX, { message: `Keep your name under ${NAME_MAX} characters.` })
    .regex(NAME_PATTERN, { message: "Use letters only (spaces, hyphens and apostrophes are fine)." }),
  email: z
    .string({ required_error: "Enter your email." })
    .trim()
    .min(1, { message: "Enter your email." })
    .max(254, { message: "That email is too long." })
    .email({ message: "Enter a valid email, like name@example.com." })
    .transform((value) => value.toLowerCase()),
  message: z
    .string({ required_error: "Write a message." })
    .trim()
    .min(MESSAGE_MIN, { message: `Tell us a bit more: at least ${MESSAGE_MIN} characters.` })
    .max(MESSAGE_MAX, { message: `Keep it under ${MESSAGE_MAX} characters.` }),
});

/** Values as typed in the form (before trimming/lowercasing). */
export type ContactInput = z.input<typeof contactSchema>;
/** Values after validation, as sent upstream. */
export type ContactValues = z.output<typeof contactSchema>;
