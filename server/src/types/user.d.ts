import { Document, PaginateModel, Types } from "mongoose";

import {
  addressDirectionSchema,
  userInputSchema,
  userSchemaComplete,
} from "../validation-schemas/user.validation";
import { z } from "zod";
import { Product } from "./product";

export type UserInput = z.infer<typeof userInputSchema>;
export type User = z.infer<typeof userSchemaComplete> & {
  cart: Types.Array<Types.ObjectId>;
  savedProducts: Types.Array<Types.ObjectId>;
  whishlist: Types.Array<Types.ObjectId>;
};
export type UserDocument = Document &
  User & {
    comparePasswords(candidatePassword: string): boolean;
    hashPassword: (newPassword: string) => void;
  };

export type UserPagination = PaginateModel<UserDocument>;
