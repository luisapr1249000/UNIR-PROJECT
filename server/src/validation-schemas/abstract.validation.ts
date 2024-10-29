import { Types } from "mongoose";
import { z } from "zod";

export const abstractSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authorObjIdSchema = z.object({
  author: z.instanceof(Types.ObjectId),
});
export const productObjIdSchema = z.object({
  product: z.instanceof(Types.ObjectId),
});
