import { z } from "zod";
import {
  productInputSchema,
  productSchema,
} from "../validation-schemas/product.validation";
import { Document } from "mongoose";

export type ProductInput = z.infer<typeof productInputSchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductDocument = Document & Product;
