import { z } from "zod";
import { Document } from "mongoose";
import { addressDirectionSchema } from "../validation-schemas/addressDirection.validation";

export type AddressDirection = z.infer<typeof addressDirectionSchema>;
export type AddressDirectionDocument = Document & AddressDirection;
