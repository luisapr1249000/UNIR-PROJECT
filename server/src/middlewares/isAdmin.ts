import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authUserRole = req.user?.role;
  if (authUserRole !== "admin") {
    return res.status(403).json({ message: "User has no permissions" });
  }
  next();
};
