import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { ProductDocument } from "../types/product";

export const productSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price is non-negative
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // Ensure quantity is non-negative
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],

    isDeleted: { type: Boolean, default: false },

    specifications: {
      dimensions: {
        width: String,
        depth: String,
        height: String,
      },
      material: String,
      finish: String,
      assemblyRequired: Boolean,
      weightCapacity: Number,
    },
    brand: [String],
    images: [
      {
        type: imageSchema, // Store image URLs
        required: true,
        default: [],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

productSchema.plugin(mongoosePaginate);
export const Product = model<ProductDocument, PaginateModel<ProductDocument>>(
  "Product",
  productSchema,
);