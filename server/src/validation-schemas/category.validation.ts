import { z } from "zod";
import { abstracSchema } from "./user.validation";

export const categoryInputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const categorySchema = abstracSchema.extend({
  author: z.string(),
});
