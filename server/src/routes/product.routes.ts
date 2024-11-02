import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { verifyUserOwnershipOrAdminRole } from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";
import { productInputSchema } from "../validation-schemas/product.validation";

const router = Router();

router.get(
  "/products",
  validPagination,
  productController.getProductsWithPagination,
);
router.post(
  "/products",
  authMiddleware,
  validateSchemaBody(productInputSchema),
  productController.createProduct,
);
router.put(
  "/products/:productId",
  authMiddleware,
  validateObjectIdParams(["productId"]),
  validateSchemaBody(productInputSchema),
  productController.updateProduct,
);
router.delete(
  "/products/:productId",
  authMiddleware,
  validateObjectIdParams(["productId"]),
  verifyUserOwnershipOrAdminRole("productId"),
  productController.deleteProduct,
);
router.get(
  "/products/author/:userId",
  validPagination,
  validateObjectIdParams(["userId"]),
  productController.getProductsByAuthorWithPagination,
);
router.get(
  "/products/:productId",
  validateObjectIdParams(["productId"]),
  productController.getProductById,
);
router.get(
  "/products/category/:categoryId",
  validPagination,
  validateObjectIdParams(["categoryId"]),
  productController.getProductsByCategoryWithPagination,
);

export { router as ProductRoutes };
