import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { isAdmin } from "../middlewares/isAdmin";
import orderItemController from "../controllers/orderItem.controller";

const router = Router();

router.put(
  "/orders/:orderId/orderItem/:orderItem",
  authMiddleware,
  isAdmin,
  checkValiObjectdId,
  orderItemController.updateOrderItem,
);
router.delete(
  "/orders/:orderId/orderItem/:orderItem",
  authMiddleware,
  isAdmin,
  checkValiObjectdId,
  orderItemController.deleteOrderItem,
);
