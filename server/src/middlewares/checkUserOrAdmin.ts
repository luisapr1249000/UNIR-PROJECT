import { Request, Response, NextFunction } from "express";
import {
  checkAddressDirectionOwnerShip,
  checkCategoryOwnerShip,
  checkOrderOwnerShip,
  checkProductOwnerShip,
  checkUser,
} from "../utils/checkPermissions.utils";
import { handleBadRequest } from "./checkObjectId";

const handleNotPermissions = (res: Response) => {
  return res.status(403).json({ message: "User has no permissions" });
};

export const checkUserOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      userId,
      productId,
      commentId,
      addressDirectionId,
      categoryId,
      orderId,
    } = req.params;
    const authUserRole = req.user?.role;
    const authUserId = req.user?._id;
    if (authUserRole === "admin") {
      return next();
    }

    if (orderId) {
      const isOwner = await checkOrderOwnerShip(authUserId ?? "");
      if (!isOwner) return handleNotPermissions(res);
    }

    if (userId) {
      const isOwner = await checkUser(authUserId ?? "");
      if (!isOwner) return handleNotPermissions(res);
    }

    if (productId) {
      const isOwner = await checkProductOwnerShip(authUserId ?? "");
      if (!isOwner) return handleNotPermissions(res);
    }

    if (commentId) {
      const isOwner = await checkProductOwnerShip(authUserId ?? "");
      if (!isOwner) return handleNotPermissions(res);
    }

    // if (addressDirectionId) {
    //   const isOwner = await checkAddressDirectionOwnerShip(authUserId ?? "");
    //   if (!isOwner) return handleNotPermissions(res);
    // }
    if (categoryId) {
      const isOwner = await checkCategoryOwnerShip(authUserId ?? "");
      if (!isOwner) return handleNotPermissions(res);
    }

    next();
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", e });
  }
};

export const isUserOwnerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authUserId = req.user?._id;
  const authUserRole = req.user?.role;
  if (authUserRole !== "admin") {
    return handleNotPermissions(res);
  }
  const { userId } = req.params;
  if (authUserId !== userId) {
    return handleNotPermissions(res);
  }
  next();
};
