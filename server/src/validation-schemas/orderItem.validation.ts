import { Types } from "mongoose";
import { z } from "zod";
import { abstractSchema, productObjIdSchema } from "./abstract.validation";

export const orderItemInputSchema = z.object({
  quantity: z.coerce.number(),
  price: z.coerce.number(),
});

export const orderItemSchema = abstractSchema
  .merge(orderItemInputSchema)
  .merge(productObjIdSchema);
