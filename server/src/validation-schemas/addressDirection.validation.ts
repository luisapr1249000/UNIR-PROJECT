import { Types } from "mongoose";
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

export const authorSchema = z.object({ user: z.instanceof(Types.ObjectId) });

export const addressDirectionSchema = abstractSchema
  .merge(addressDirectionInputSchema)
  .merge(authorSchema);
