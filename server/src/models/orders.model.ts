import { PaginateModel, Schema, model } from "mongoose";
import { orderItemSchema } from "./orderItem.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { OrderDocument } from "../types/order";

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    orderItems: [orderItemSchema],
  },
  { timestamps: true },
);
orderSchema.plugin(mongoosePaginate);
export const Order = model<OrderDocument, PaginateModel<OrderDocument>>(
  "Order",
  orderSchema,
);
