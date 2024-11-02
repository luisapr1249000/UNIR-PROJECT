import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { Category } from "../models/category.model";

class CategoryController {
  public async createCategory(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const category = new Category({ ...req.body, author: authUserId });
      await category.save();
      return res.status(201).json(category);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findOneAndUpdate(
        { _id: categoryId },
        req.body,
        { new: true },
      );
      if (!category) {
        return handleObjectNotFound(res, "Category");
      }
      return res.status(201).json(category);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findOneAndDelete({
        _id: categoryId,
      });
      if (!category) {
        return handleObjectNotFound(res, "Category");
      }
      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCategoriesWithPagination(req: Request, res: Response) {
    try {
      const categories = await Category.paginate(
        {},
        { ...req.query, populate: "author" },
      );
      const { docs } = categories;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "Categories");
      }
      return res.status(200).json(categories);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new CategoryController();
