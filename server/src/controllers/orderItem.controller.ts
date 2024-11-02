import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { Order } from "../models/orders.model";

class OrderItem {
  public async updateOrderItem(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { orderItemId } = req.params;
      const { quantity, price } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToUpdate = order.orderItems.id(orderItemId);
      if (!itemToUpdate) {
        return handleObjectNotFound(res, "Order");
      }

      if (quantity !== undefined) itemToUpdate.quantity = quantity;
      if (price !== undefined) itemToUpdate.price = price;

      await order.save();
      res.status(200).json(order);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteOrderItem(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { orderItemId } = req.params;

      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToDelete = order.orderItems.id(orderItemId);
      if (!itemToDelete) {
        return handleObjectNotFound(res, "Order");
      }

      itemToDelete.deleteOne();
      await order.save();
      res.status(200).json(order);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new OrderItem();
