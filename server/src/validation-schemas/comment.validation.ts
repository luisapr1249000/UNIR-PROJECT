import { z } from "zod";
import { imageSchema } from "./product.validation";
import {
  abstractSchema,
  authorObjIdSchema,
  productObjIdSchema,
} from "./abstract.validation";

export const commentInputSchema = z.object({
  content: z.string().min(1),
  review: z.coerce.number().nonnegative().optional().default(1),
  image: z.array(imageSchema).optional().default([]),
});

export const commentSchema = abstractSchema
  .merge(commentInputSchema)
  .merge(authorObjIdSchema)
  .merge(productObjIdSchema);
