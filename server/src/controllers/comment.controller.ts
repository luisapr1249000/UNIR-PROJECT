import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { getError, handleObjectNotFound } from "../utils/error.utils";
import {
  commentIdParamSchema,
  paginationNoPopulateSchema,
  productIdParamSchema,
  userIdParamSchema,
} from "../validation-schemas/query.validation";
import { Product } from "../models/product.model";
import { Comment } from "../models/comment.model";
import { commentInputSchema } from "../validation-schemas/comment.validation";

class CommentController {
  public async createComment(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      commentInputSchema.parse(req.body);
      const { productId } = productIdParamSchema.parse(req.params);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async updateComment(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      commentInputSchema.parse(req.body);
      const { productId } = productIdParamSchema.parse(req.params);
      const { commentId } = commentIdParamSchema.parse(req.params);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async deleteComment(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      commentInputSchema.parse(req.body);
      const { productId } = productIdParamSchema.parse(req.params);
      const { commentId } = commentIdParamSchema.parse(req.params);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getAllComments(req: Request, res: Response) {
    try {
      paginationNoPopulateSchema.parse(req.query);

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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getCommentsFromProduct(req: Request, res: Response) {
    try {
      const { productId } = productIdParamSchema.parse(req.params);
      paginationNoPopulateSchema.parse(req.query);

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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getUserComments(req: Request, res: Response) {
    try {
      const { userId } = userIdParamSchema.parse(req.params);
      paginationNoPopulateSchema.parse(req.query);

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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getCommentById(req: Request, res: Response) {
    try {
      const { commentId } = commentIdParamSchema.parse(req.params);
      const comments = await Comment.findById(commentId)
        .populate("author")
        .populate("product");
      if (!comments) {
        return handleObjectNotFound(res, "Comment");
      }

      return res.status(200).json(comments);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
}

export default new CommentController();
