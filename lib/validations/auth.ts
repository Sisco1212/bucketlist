import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username cannot exceed 20 characters."),

   email: z.email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export const loginSchema = z.object({
  email: z.email({
    error: "Please enter a valid email.",
  }),

  password: z.string().min(1, {
    error: "Password is required.",
  }),
});