import { Schema, model } from "mongoose";
import { orderItemSchema } from "./orderItem.model";

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
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
});

export const Order = model("Order", orderSchema);
