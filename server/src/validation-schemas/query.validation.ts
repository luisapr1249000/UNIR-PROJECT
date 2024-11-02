import { z } from "zod";

export const usernameParamSchema = z.object({
  username: z.string().min(1),
});

export const paginationCoerceSchema = z.object({
  page: z.coerce.number().nonnegative().min(1).default(1),
  limit: z.coerce.number().nonnegative().min(10).default(10),
  sort: z
    .enum(["createdAt", "-createdAt", "updatedAt", "-updatedAt"])
    .optional()
    .default("-createdAt"),
});

export const searchSchema = paginationCoerceSchema.extend({
  searchQuery: z.string().min(1, "Search required"),
  isPost: z.coerce.boolean().optional(),
  isComment: z.coerce.boolean().optional(),
});
