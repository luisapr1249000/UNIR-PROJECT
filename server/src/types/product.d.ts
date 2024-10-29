import { z } from "zod";
import {
  productInputSchema,
  commentSchema,
} from "../validation-schemas/product.validation";
import { productSchema } from "../models/product.model";
import { Document } from "mongoose";

export type ProductInput = z.infer<typeof productInputSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductDocument = Document & Product;
