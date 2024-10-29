import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { AddressDirectionDocument } from "../types/addressDirectionSchema";

export const addressDirectionSchema = new Schema(
  {
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
    },
    addressLine2: {
      type: String,
      trim: true, // Optional field
      maxlength: 100,
    },
    cityDistrictTown: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
    },
    alternatePhone: {
      type: String,
      trim: true, // Optional field
    },
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work"], // Define acceptable types
    },
  },
  { timestamps: true },
);

addressDirectionSchema.plugin(mongoosePaginate);
export const AddressDirection = model<
  AddressDirectionDocument,
  PaginateModel<AddressDirectionDocument>
>("Address Directions", addressDirectionSchema);
