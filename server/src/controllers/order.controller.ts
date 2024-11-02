import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { Order } from "../models/orders.model";
import { handleError, handleObjectNotFound } from "../utils/error.utils";

class OrderController {
  public async createOrder(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { totalPrice, orderItems } = req.body;
      const order = new Order({
        customerId: authUserId,
        totalPrice,
        orderItems: orderItems,
      });
      await order.save();
      return res.status(201).json(order);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const orderUpdated = await Order.findOneAndUpdate(
        {
          _id: orderId,
        },
        req.body,
        { new: true },
      );
      if (!orderUpdated) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orderUpdated);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async deleteOrder(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { orderId } = req.params;
      const orderDeleted = await Order.findOneAndDelete({
        _id: orderId,
        author: authUserId,
      });
      if (!orderDeleted) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getOrders(_req: Request, res: Response) {
    try {
      const orders = await Order.find({});
      if (!orders) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orders);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getOrdersByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const orders = await Order.find({ customerId: userId });
      if (!orders) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orders);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new OrderController();
