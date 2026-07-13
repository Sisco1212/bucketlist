import { z } from "zod";

export const createWishSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "A wish title is required.")
    .max(100, "A wish title cannot exceed 100 characters."),

 description: z
  .string()
  .trim()
  .max(500, "Description cannot exceed 500 characters.")
  .transform((value) => (value === "" ? null : value))
  .nullable()
  .optional(),
});

export type CreateWishInput = z.infer<typeof createWishSchema>;