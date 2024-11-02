import { z } from "zod";

const passwordValidaton = z.string().min(1, "Password required");

export const signupSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.string().min(1, "Email required"),
  password: passwordValidaton,
});

export const loginSchema = z.object({
  rememberMe: z.coerce.boolean().optional(),
  loginValue: z.string().min(1, "Field required"),
  password: passwordValidaton,
});

export const jwtSchema = z.object({
  sub: z.string().min(1),
  username: z.string().min(1),
});
