import { Router } from "express";
import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/categories", categoryController.getCategoriesWithPagination);
router.post("/categories", authMiddleware, categoryController.createCategory);
router.put(
  "/categories/:categoryId",
  authMiddleware,
  categoryController.updateCategory,
);
router.delete(
  "/categories/:categoryId",
  authMiddleware,
  categoryController.deleteCategory,
);

export { router as CategoryRoutes };
