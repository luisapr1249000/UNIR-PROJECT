import { z } from "zod";
import {
  abstractSchema,
  mongooseObjectId,
  productObjIdSchema,
} from "./abstract.validation";

export const orderItemInputSchema = z.object({
  quantity: z.coerce.number(),
  price: z.coerce.number(),
});

export const orderItemSchema = abstractSchema
  .merge(orderItemInputSchema)
  .merge(productObjIdSchema);

export const orderInputSchema = z.object({
  totalPrice: z.coerce.number(),
  orderItems: z.array(orderItemSchema),
});

export const orderSchema = z.object({
  customId: mongooseObjectId,
  status: z
    .enum(["pending", "processing", "shipped", "delivered"])
    .default("pending"),
});

export const orderSchemaComplete = abstractSchema
  .merge(orderSchema)
  .merge(orderInputSchema);
