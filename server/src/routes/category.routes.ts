import { Router } from "express";
import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { checkUserOrAdmin } from "../middlewares/checkUserOrAdmin";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/categories", categoryController.getCategoriesWithPagination);
router.post(
  "/categories",
  isAdmin,
  authMiddleware,
  categoryController.createCategory,
);
router.put(
  "/categories/:categoryId",
  authMiddleware,
  isAdmin,
  checkValiObjectdId,
  categoryController.updateCategory,
);
router.delete(
  "/categories/:categoryId",
  authMiddleware,
  checkValiObjectdId,
  isAdmin,
  categoryController.deleteCategory,
);

export { router as CategoryRoutes };
