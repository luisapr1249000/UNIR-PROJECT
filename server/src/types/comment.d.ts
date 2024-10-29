import { Document } from "mongoose";
import { Types } from "mongoose";
import { commentSchema } from "../validation-schemas/product.validation";

export type Comment = z.infer<typeof commentSchema>;
export type CommentDocument = Document & Comment;
