import { Router } from "express";
import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { checkUserOrAdmin } from "../middlewares/checkUserOrAdmin";

const router = Router();

router.get("/categories", categoryController.getCategoriesWithPagination);
router.post("/categories", authMiddleware, categoryController.createCategory);
router.put(
  "/categories/:categoryId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  categoryController.updateCategory,
);
router.delete(
  "/categories/:categoryId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  categoryController.deleteCategory,
);

export { router as CategoryRoutes };
