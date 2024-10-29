import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { getError, handleObjectNotFound } from "../utils/error.utils";
import { Order } from "../models/orders.model";

class OrderItem {
  public async updateOrderItem(req: Request, res: Response) {
    try {
      const { orderId, itemId } = req.params;
      const { quantity, price } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToUpdate = order.orderItems.id(itemId);
      if (!itemToUpdate) {
        return handleObjectNotFound(res, "Order");
      }

      if (quantity !== undefined) itemToUpdate.quantity = quantity;
      if (price !== undefined) itemToUpdate.price = price;

      await order.save();
      res.status(200).json(order);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async deleteOrderItem(req: Request, res: Response) {
    try {
      const { orderId, itemId } = req.params;

      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToDelete = order.orderItems.id(itemId);
      if (!itemToDelete) {
        return handleObjectNotFound(res, "Order");
      }

      itemToDelete.deleteOne();
      await order.save();
      res.status(200).json(order);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
}

export default new OrderItem();
