import { Types } from "mongoose";
import { z } from "zod";

export const objectIdValidator = z
  .string()
  .min(1, { message: "Id required" })
  .refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid ObjectId format",
  });

export const abstractSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authorObjIdSchema = z.object({
  author: objectIdValidator,
});
export const productObjIdSchema = z.object({
  product: objectIdValidator,
});
