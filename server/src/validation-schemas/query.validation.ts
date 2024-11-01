import { z } from "zod";
import { objectIdValidator } from "./abstract.validation";

export const userIdParamSchema = z.object({
  userId: objectIdValidator,
});

export const productIdParamSchema = z.object({
  productId: objectIdValidator,
});
export const commentIdParamSchema = z.object({
  commentId: objectIdValidator,
});

export const usernameParamSchema = z.object({
  username: z.string().min(1),
});

export const orderIdParamSchema = z.object({
  orderId: objectIdValidator,
});

export const orderItemIdParamSchema = z.object({
  orderItemId: objectIdValidator,
});

export const addressDirectionIdParamSchema = z.object({
  addressDirectionId: objectIdValidator,
});

export const categoryIdParamSchema = z.object({
  categoryId: objectIdValidator,
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
