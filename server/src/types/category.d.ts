import { z } from "zod";
import {
  categoryInputSchema,
  categorySchema,
} from "../validation-schemas/category.validation";
import { Document } from "mongoose";

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CategoryDocument = Document & Category;
