import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.string().min(1, "Email required"),
  password: z.string().min(1, "Password required"),
});

export const loginSchema = z.object({
  rememberMe: z.coerce.boolean().optional(),
  loginValue: z.string().min(1, "Field required"),
  password: z.string().min(1, "Password required"),
});

export const jwtSchema = z.object({
  sub: z.string().min(1),
  username: z.string().min(1),
});
