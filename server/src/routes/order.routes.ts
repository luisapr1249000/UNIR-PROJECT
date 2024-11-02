import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  isAdmin,
  isUserOwnerOrAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/checkUserOrAdmin.middleware";
import orderController from "../controllers/order.controller";
import orderItemController from "../controllers/orderItem.controller";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import {
  orderInputSchema,
  orderItemInputSchema,
} from "../validation-schemas/order.validation";

const router = Router();

router.get("/orders", authMiddleware, isAdmin, orderController.getOrders);
router.get(
  "/orders/user/:userId",
  authMiddleware,
  isUserOwnerOrAdmin,
  orderController.getOrdersByUser,
);
router.post(
  "/orders",
  authMiddleware,
  validateSchemaBody(orderInputSchema),
  orderController.createOrder,
);
router.put(
  "/orders/:orderId",
  authMiddleware,
  validateObjectIdParams(["orderId"]),
  verifyUserOwnershipOrAdminRole("orderId"),
  validateSchemaBody(orderInputSchema),
  orderController.updateOrder,
);
router.delete(
  "/orders/:orderId",
  authMiddleware,
  validateObjectIdParams(["orderId"]),
  verifyUserOwnershipOrAdminRole("orderId"),
  orderController.deleteOrder,
);

router.put(
  "/orders/:orderId/orderItem/:orderItem",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(["orderId", "orderItemId"]),
  validateSchemaBody(orderItemInputSchema),
  orderItemController.updateOrderItem,
);
router.delete(
  "/orders/:orderId/orderItem/:orderItem",
  authMiddleware,
  validateObjectIdParams(["orderId", "orderItemId"]),
  isAdmin,
  orderItemController.deleteOrderItem,
);

export { router as OrderRoutes };
