import { CookieOptions, Request, Response } from "express";
import { DEFAULT_COOKIES_DAY } from "../constants";
import { UserJwt } from "../types/auth";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
config();

export const setTokenCookie = (
  res: Response,
  cookieName: string,
  token: string,
  maxAge: number | null = DEFAULT_COOKIES_DAY
) => {
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAge,
    path: "/",
    sameSite: "strict",
  } as CookieOptions;

  // console.log(opts);

  res.cookie(cookieName, token, opts);
};

export const createPayload = (id: string, username: string): UserJwt => {
  return {
    sub: id.toString(),
    username: username,
  };
};

export const getKey = () => {
  const key = process.env.ACCESS_TOKEN_SECRET;
  if (!key) {
    throw new Error("Missing environment variable: ACCESS_TOKEN_SECRET");
  }

  return key;
};

export const genAccessToken = (payload: UserJwt) => {
  return jwt.sign(payload, getKey(), { expiresIn: "20m" });
};

export const genRefreshToken = (payload: UserJwt) => {
  return jwt.sign(payload, getKey(), { expiresIn: "7d" });
};

export const checkRefreshTokenAndGenAccessToken = (refreshToken: string) => {
  const key = getKey();

  try {
    const { username, sub } = jwt.verify(refreshToken, key) as UserJwt;
    const payload = { username, sub } as UserJwt;
    return genAccessToken(payload);
  } catch (_error) {
    return null; // Return null for invalid tokens
  }
};

export const extractAuthUserId = (req: Request): string => {
  const userId = req.user ? (req.user as { _id: string })._id : "";
  return userId ? userId.toString() : ""; // Ensure a valid string is returned
};
