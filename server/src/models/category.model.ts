import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { CategoryDocument } from "../types/category";

const categorySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, unique: true },
    description: String,
  },
  { timestamps: true },
);

categorySchema.plugin(mongoosePaginate);
export const Category = model<
  CategoryDocument,
  PaginateModel<CategoryDocument>
>("Category", categorySchema);
