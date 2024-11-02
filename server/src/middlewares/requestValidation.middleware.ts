import { NextFunction, Request, Response } from "express";
import { handleBadRequest } from "../utils/error.utils";
import { objectIdValidator } from "../validation-schemas/abstract.validation";
import {
  paginationCoerceSchema,
  usernameParamSchema,
} from "../validation-schemas/query.validation";

export const validateSchemaBody = (schema: Zod.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return handleBadRequest(res, result.error);
    }
    next();
  };
};

export const validateObjectIdParams = (paramNames: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    for (const paramName of paramNames) {
      const paramValue = req.params[paramName];

      const result = objectIdValidator.safeParse(paramValue);
      if (!result.success) {
        return handleBadRequest(res, result.error);
      }
    }
    next();
  };
};

export const validPagination = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const paginationResult = paginationCoerceSchema.safeParse(req.query);
  if (!paginationResult.success) {
    return handleBadRequest(res, paginationResult.error);
  }
  next();
};
export const validUsername = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = usernameParamSchema.safeParse(req.query);
  if (!result.success) {
    return handleBadRequest(res, result.error);
  }
  next();
};
