import { Types } from "mongoose";
import { z } from "zod";
import { abstractSchema } from "./abstract.validation";
import { orderItemSchema } from "./orderItem.validation";

export const orderInputSchema = z.object({
  totalPrice: z.coerce.number(),
  orderItems: z.array(orderItemSchema),
});

export const orderSchema = z.object({
  customId: z.instanceof(Types.ObjectId),
  status: z
    .enum(["pending", "processing", "shipped", "delivered"])
    .default("pending"),
});

export const orderSchemaComplete = abstractSchema
  .merge(orderSchema)
  .merge(orderInputSchema);
