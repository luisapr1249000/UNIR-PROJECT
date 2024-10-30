import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { Order } from "../models/orders.model";
import { getError, handleObjectNotFound } from "../utils/error.utils";
import { orderInputSchema } from "../validation-schemas/order.validation";
import { orderIdParamSchema } from "../validation-schemas/query.validation";

class OrderController {
  public async createOrder(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { totalPrice, orderItems } = orderInputSchema.parse(req.body);
      const order = new Order({
        customerId: authUserId,
        totalPrice,
        orderItems: orderItems,
      });
      await order.save();
      return res.status(201).json(order);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async updateOrder(req: Request, res: Response) {
    try {
      const { orderId } = orderIdParamSchema.parse(req.params);
      orderInputSchema.parse(req.body);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
  public async deleteOrder(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { orderId } = orderIdParamSchema.parse(req.params);
      const orderDeleted = await Order.findOneAndDelete({
        _id: orderId,
        author: authUserId,
      });
      if (!orderDeleted) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(204);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getOrders(req: Request, res: Response) {
    try {
      const orders = await Order.find({});
      if (!orders) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orders);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
}

export default new OrderController();
