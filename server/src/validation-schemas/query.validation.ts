import { z } from "zod";

export const userIdParamSchema = z.object({
  userId: z.string().min(1),
});

export const productIdParamSchema = z.object({
  productId: z.string().min(1),
});
export const commentIdParamSchema = z.object({
  commentId: z.string().min(1),
});

export const usernameParamSchema = z.object({
  username: z.string().min(1),
});

export const addressDirectionIdParamSchema = z.object({
  addressDirectionId: z.string().min(1),
});

export const paginationCoerceSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional().default(10),
  sort: z
    .enum(["createdAt", "-createdAt", "updatedAt", "-updatedAt"])
    .optional()
    .default("-createdAt"),
  populate: z.array(z.string()).optional(),
});

export const paginationNoPopulateSchema = paginationCoerceSchema.omit({
  populate: true,
});

export const searchSchema = paginationCoerceSchema.extend({
  searchQuery: z.string().min(1, "Search required"),
  isPost: z.coerce.boolean().optional(),
  isComment: z.coerce.boolean().optional(),
});
