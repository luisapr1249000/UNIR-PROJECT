import { z } from "zod";
import {
  jwtSchema,
  loginSchema,
  signupSchema,
} from "../validation-schemas/auth.validation";

export type Signup = z.infer<typeof signupSchema>;
export type Login = z.infer<typeof loginSchema>;
export type UserJwt = z.infer<typeof jwtSchema>;
