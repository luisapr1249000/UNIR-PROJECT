import { z } from "zod";
import {
  orderItemInputSchema,
  orderItemSchema,
} from "../validation-schemas/orderItem.validation";
import { Document } from "mongoose";

export type OrderItemInput = z.infer<typeof orderItemInputSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderItemDocument = Document & OrderItem;
