import { z } from "zod";
import { WISH_STATUS_VALUES } from "@/lib/constants/wish-status";


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


export const updateWishStatusSchema = z.object({
  id: z.uuid("Invalid wish ID."),

  status: z.enum(WISH_STATUS_VALUES)
});

export const deleteWishSchema = z.object({
  id: z.uuid("Invalid wish ID."),
});

export const updateWishSchema = z.object({
  id: z.uuid("Invalid wish ID."),
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),
});

export const shareWishSchema = z.object({
  id: z.uuid(),
  isPublic: z.boolean(),
});