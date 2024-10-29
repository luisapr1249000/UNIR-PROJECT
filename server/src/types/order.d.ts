import { z } from "zod";
import {
  orderInputSchema,
  orderSchema,
} from "../validation-schemas/order.validation";
import { Document, Types } from "mongoose";
import { OrderItemDocument } from "./orderItem";

export type OrderInput = z.infer<typeof orderInputSchema>;
export type Order = z.infer<typeof orderSchema> & {
  orderItems: Types.DocumentArray<OrderItemDocument>;
};
export type OrderDocument = Document & Order;
