import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { Product } from "../models/product.model";
import { Comment } from "../models/comment.model";

class CommentController {
  public async createComment(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return handleObjectNotFound(res, "Product", true);
      }

      const comment = new Comment({
        ...req.body,
        author: authUserId,
        product: productId,
      });
      await comment.save();

      return res.status(201).json(comment);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateComment(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId } = req.params;
      const { commentId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return handleObjectNotFound(res, "Product", true);
      }

      const comment = await Comment.findOneAndUpdate(
        {
          _id: commentId,
          author: authUserId,
          product: productId,
        },
        req.body,
        { new: true },
      );
      if (!comment) {
        return handleObjectNotFound(res, "Comment");
      }

      return res.status(200).json(comment);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteComment(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId } = req.params;
      const { commentId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return handleObjectNotFound(res, "Product", true);
      }
      const comment = await Comment.findOneAndDelete({
        _id: commentId,
        author: authUserId,
        product: productId,
      });
      if (!comment) {
        return handleObjectNotFound(res, "Comment");
      }

      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getAllComments(req: Request, res: Response) {
    try {
      const options = {
        ...req.query,
        populate: ["author", "product"],
      };

      const query = {
        isDeleted: false,
      };

      const comments = await Comment.paginate(query, options);
      const { docs } = comments;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "Comment", true);
      }

      return res.status(200).json(comments);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCommentsFromProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const options = {
        ...req.query,
        populate: ["author"],
      };

      const query = {
        isDeleted: false,
        product: productId,
      };

      const comments = await Comment.paginate(query, options);
      const { docs } = comments;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "Comment", true);
      }

      return res.status(200).json(comments);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserComments(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const options = {
        ...req.query,
        populate: ["author", "product"],
      };

      const query = {
        isDeleted: false,
        author: userId,
      };

      const comments = await Comment.paginate(query, options);
      const { docs } = comments;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "Comment", true);
      }

      return res.status(200).json(comments);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCommentById(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const comments = await Comment.findById(commentId)
        .populate("author")
        .populate("product");
      if (!comments) {
        return handleObjectNotFound(res, "Comment");
      }

      return res.status(200).json(comments);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new CommentController();
