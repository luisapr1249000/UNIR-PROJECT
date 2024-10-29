import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authMiddleware, authController.logout);
router.get("/auth/user/me", authMiddleware, authController.getAuthUser);
router.get("/auth/token/refresh", authMiddleware, authController.refreshToken);

export { router as AuthRoutes };
