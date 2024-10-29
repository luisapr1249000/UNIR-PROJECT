import { Response } from "express";
import { ZodError } from "zod";

export const getError = (e: unknown) => {
  if (e instanceof ZodError) return { status: 400, error: e.issues };
  return e instanceof Error
    ? { status: 500, error: e.message }
    : { status: 500, error: "Something Went Bad" };
};
export const handleObjectNotFound = (
  res: Response,
  objectType: "User" | "Product" | "Comment" | "Category" | "Address" | "Order",
  multipleObjects = false,
  extraMessage = "",
) => {
  const pluralSuffix = multipleObjects ? "s" : "";
  const message = `${objectType}${pluralSuffix} Not Found${extraMessage ? ` ${extraMessage}` : ""}`;

  return res.status(404).json({ message });
};
