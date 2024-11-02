import { Document } from "mongoose";
import { commentSchema } from "../validation-schemas/comment.validation";
import { z } from "zod";

export type Comment = z.infer<typeof commentSchema>;
export type CommentDocument = Document & Comment;
