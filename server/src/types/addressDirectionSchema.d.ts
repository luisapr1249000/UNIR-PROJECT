import { z } from "zod";
import { addressDirectionSchema } from "../models/addressDirection.model";
import { Document } from "mongoose";

export type AddressDirection = z.infer<typeof addressDirectionSchema>;
export type AddressDirectionDocument = Document & AddressDirection;
