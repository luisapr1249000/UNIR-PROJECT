import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

export const handleBadRequest = (res: Response) => {
  return res.status(400).json({ message: "Invalid Id" });
};
export const checkValiObjectdId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    userId,
    productId,
    commmentId,
    categoryId,
    AddressDirectionId,
    orderId,
    orderItemId,
  } = req.params;
  if (!userId && !Types.ObjectId.isValid(userId)) {
    return handleBadRequest(res);
  }
  if (!productId && !Types.ObjectId.isValid(productId)) {
    return handleBadRequest(res);
  }
  if (!commmentId && !Types.ObjectId.isValid(commmentId)) {
    return handleBadRequest(res);
  }
  if (!categoryId && !Types.ObjectId.isValid(categoryId)) {
    return handleBadRequest(res);
  }
  if (!AddressDirectionId && !Types.ObjectId.isValid(AddressDirectionId)) {
    return handleBadRequest(res);
  }
  if (!orderId && !Types.ObjectId.isValid(orderId)) {
    return handleBadRequest(res);
  }

  if (!orderItemId && !Types.ObjectId.isValid(orderItemId)) {
    return handleBadRequest(res);
  }

  next();
};
