import { PaginateModel, Schema, model } from "mongoose";
import { imageSchema } from "./user.model";
import mongoosePaginate from "mongoose-paginate-v2";
import { CommentDocument } from "../types/comment";

export const commentSchema = new Schema(
  {
    content: String,
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    images: [imageSchema],
    review: { type: Number, default: undefined, min: 1, max: 5 },
  },
  { timestamps: true },
);
commentSchema.plugin(mongoosePaginate);
export const Comment = model<CommentDocument, PaginateModel<CommentDocument>>(
  "Comment",
  commentSchema,
);
