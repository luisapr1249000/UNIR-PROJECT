import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { getError, handleObjectNotFound } from "../utils/error.utils";
import { categoryInputSchema } from "../validation-schemas/category.validation";
import { Category } from "../models/category.model";
import { paginationNoPopulateSchema } from "../validation-schemas/query.validation";

class CategoryController {
  public async createCategory(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      categoryInputSchema.parse(req.body);
      const category = new Category({ ...req.body, author: authUserId });
      await category.save();
      return res.status(201).json(category);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      categoryInputSchema.parse(req.body);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
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
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }

  public async getCategoriesWithPagination(req: Request, res: Response) {
    try {
      const { limit, page, sort } = paginationNoPopulateSchema.parse(req.query);

      const categories = await Category.paginate(
        {},
        { limit, page, sort, populate: "author" },
      );
      const { docs } = categories;
      if (docs.length <= 0) {
        return handleObjectNotFound(res, "Categories");
      }
      return res.status(200).json(categories);
    } catch (e) {
      const { status, error } = getError(e);
      return res.status(status).json(error);
    }
  }
}

export default new CategoryController();
