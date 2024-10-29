import { z } from "zod";
import { abstractSchema, authorObjIdSchema } from "./abstract.validation";

export const categoryInputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const categorySchema = abstractSchema
  .merge(categoryInputSchema)
  .merge(authorObjIdSchema);
