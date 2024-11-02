import { z } from "zod";
import { abstractSchema } from "./abstract.validation";

export const addressDirectionInputSchema = z.object({
  mobileNumber: z.string().min(1, "Mobile number is required"),
  pinCode: z.string().min(1, "Pin code is required"),
  locality: z.string().min(1, "Locality is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  cityDistrictTown: z.string().min(1, "City/District/Town is required"),
  state: z.string().min(1, "State is required"),
  landmark: z.string().optional(),
  alternatePhone: z.string().optional(),
  addressType: z.enum(["home", "work"]),
});

export const addressDirectionSchema = abstractSchema.merge(
  addressDirectionInputSchema,
);

export const userInputSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.string().email("Invalid email format").trim(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  phoneNumber: z.number().optional(),
});

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  productSaved: z.array(z.string()).optional(),
  cart: z.array(z.string()).optional(),
});

export const userSchemaComplete = abstractSchema.merge(userSchema);
