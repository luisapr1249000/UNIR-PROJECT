import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import {
  checkUserOrAdmin,
  isUserOwnerOrAdmin,
} from "../middlewares/checkUserOrAdmin";
import orderController from "../controllers/order.controller";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/orders", authMiddleware, isAdmin, orderController.getOrders);
router.get(
  "/orders/user/:userId",
  authMiddleware,
  checkValiObjectdId,
  isUserOwnerOrAdmin,
  orderController.getOrdersByUser,
);
router.post("/orders", authMiddleware, orderController.createOrder);
router.put(
  "/orders/:orderId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  orderController.updateOrder,
);
router.delete(
  "/orders/:orderId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  orderController.deleteOrder,
);
