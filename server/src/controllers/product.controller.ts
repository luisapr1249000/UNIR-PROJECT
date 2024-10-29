import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { getError, handleObjectNotFound } from "../utils/error.utils";
import { productInputSchema } from "../validation-schemas/product.validation";
import { Product } from "../models/product.model";
import {
  paginationNoPopulateSchema,
  productIdParamSchema,
  userIdParamSchema,
} from "../validation-schemas/query.validation";

class ProductController {
  public async createProduct(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      productInputSchema.parse(req.body);
      const product = new Product({ ...req.body, author: authUserId });
      await product.save();
      return res.status(201).json(product);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = productIdParamSchema.parse(req.params); // For delete and get by id
      const authUserId = extractAuthUserId(req);
      productInputSchema.parse(req.body);
      const product = await Product.findOneAndUpdate(
        { _id: productId, author: authUserId },
        {
          ...req.body,
        },
        { new: true },
      );
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(product);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = productIdParamSchema.parse(req.query);
      const authUserId = extractAuthUserId(req);
      productInputSchema.parse(req.body);
      const product = await Product.findOneAndDelete(
        { _id: productId, author: authUserId },
        {
          ...req.body,
        },
      );
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(204).json(product);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getProductsWithPagination(req: Request, res: Response) {
    try {
      const {
        limit,
        sort = "-createdAt",
        page,
      } = paginationNoPopulateSchema.parse(req.query);
      const products = await Product.paginate(
        {},
        { limit, sort, page, populate: ["author", "categories"] },
      );
      if (products.docs.length === 0) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(products);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      const { productId } = productIdParamSchema.parse(req.params); // For delete and get by id
      const product = await Product.findById(productId)
        .populate("author")
        .populate("categories");
      if (!product) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(product);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getProductsByAuthorWithPagination(req: Request, res: Response) {
    try {
      const { limit, sort, page } = paginationNoPopulateSchema.parse(req.query);
      const { userId } = userIdParamSchema.parse(req.params);
      const query = {
        author: userId,
      };
      const products = await Product.paginate(query, {
        limit,
        sort,
        page,
        populate: ["author", "categories"],
      });
      if (products.docs.length === 0) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(products);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
}

export default new ProductController();
