import { z } from "zod";
import { abstractSchema } from "./abstract.validation";

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

export const userSchemaComplete = abstractSchema.merge(userSchema);
