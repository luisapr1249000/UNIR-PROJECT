import { Router } from "express";
import categoryController from "../controllers/category.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";
import { categoryInputSchema } from "../validation-schemas/category.validation";
import { isAdmin } from "../middlewares/checkUserOrAdmin.middleware";

const router = Router();

router.get(
  "/categories",
  validPagination,
  categoryController.getCategoriesWithPagination,
);
router.post(
  "/categories",
  isAdmin,
  authMiddleware,
  validateSchemaBody(categoryInputSchema),
  categoryController.createCategory,
);
router.put(
  "/categories/:categoryId",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(["categoryId"]),
  validateSchemaBody(categoryInputSchema),
  categoryController.updateCategory,
);
router.delete(
  "/categories/:categoryId",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(["categoryId"]),
  categoryController.deleteCategory,
);

export { router as CategoryRoutes };
