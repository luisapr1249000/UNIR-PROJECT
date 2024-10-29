import { z } from "zod";

export const imageSchema = z.object({
  originalName: z.string(),
  url: z.string().url("Invalid image URL"),
  contentType: z.string(),
  size: z.number().nonnegative("Size must be a non-negative number"),
});

export const commentInputSchema = z.object({
  content: z.string().min(1),
  review: z.coerce.number().nonnegative().optional().default(1),
  image: z.array(imageSchema).optional().default([]),
});

export const commentSchema = commentInputSchema.extend({
  author: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const specificationsSchema = z.object({
  dimensions: z
    .object({
      width: z.string().optional(),
      depth: z.string().optional(),
      height: z.string().optional(),
    })
    .optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  assemblyRequired: z.boolean().optional(),
  weightCapacity: z.number().optional(),
});

export const productInputSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  description: z.string().min(1, "Description is required"),
  category: z.string().optional(),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().nonnegative("Quantity must be non-negative"),
  images: z.array(imageSchema).default([]), // Default to an empty array if no images are provided
  specifications: specificationsSchema.optional(),
});

export const productSchema = productInputSchema.extend({
  author: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
