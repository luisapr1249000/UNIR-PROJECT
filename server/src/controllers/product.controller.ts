import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { Product } from "../models/product.model";

class ProductController {
  public async createProduct(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const product = new Product({ ...req.body, author: authUserId });
      await product.save();
      return res.status(201).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndUpdate(
        productId,
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
      return handleError(res, e);
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(204).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductsWithPagination(req: Request, res: Response) {
    try {
      const products = await Product.paginate(
        {},
        { ...req.query, populate: ["author", "categories"] },
      );
      if (products.docs.length === 0) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(products);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId)
        .populate("author")
        .populate("categories");
      if (!product) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductsByAuthorWithPagination(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const query = {
        author: userId,
      };
      const products = await Product.paginate(query, {
        ...req.query,
        populate: ["author", "categories"],
      });
      if (products.docs.length === 0) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(products);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async getProductsByCategoryWithPagination(
    req: Request,
    res: Response,
  ) {
    try {
      const { categoryId } = req.params;
      const query = {
        categories: categoryId,
      };
      const products = await Product.paginate(query, {
        ...req.query,
        populate: ["author"],
      });
      if (products.docs.length === 0) {
        return handleObjectNotFound(res, "Product", true);
      }

      return res.status(200).json(products);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new ProductController();
