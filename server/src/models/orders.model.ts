import { Types } from "mongoose";
import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const OrderItem = model("Order Item", orderItemSchema);

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer", // Assuming you have a Customer model
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
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
});

export const Order = model("Order", orderSchema);
