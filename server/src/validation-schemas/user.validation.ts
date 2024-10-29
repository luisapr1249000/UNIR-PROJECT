import { z } from "zod";

export const abstracSchema = z.object({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

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

export const authorSchema = z.object({ user: z.string().min(1) });

export const addressDirectionSchema = abstracSchema
  .merge(addressDirectionInputSchema)
  .merge(authorSchema);

export const userInputSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.string().email("Invalid email format").trim(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  phoneNumber: z.number().optional(), // Consider using string for phone numbers
});

export const userSchema = userInputSchema.extend({
  isSeller: z.boolean(),
  role: z.enum(["user", "admin"]),
  lastLogin: z.date().optional(),
  productSaved: z.array(z.string()).optional(), // Assuming ObjectId is represented as a string
  cart: z.array(z.string()).optional(), // Assuming ObjectId is represented as a string
});

export const userSchemaComplete = abstracSchema.merge(userSchema);
