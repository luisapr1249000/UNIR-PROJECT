import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { checkUserOrAdmin } from "../middlewares/checkUserOrAdmin";

const router = Router();

router.get(
  "/products",
  authMiddleware,
  productController.getProductsWithPagination,
);
router.post("/products", authMiddleware, productController.createProduct);
router.put(
  "/products/:productId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  productController.updateProduct,
);
router.delete(
  "/products/:productId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  productController.deleteProduct,
);
router.get(
  "/products/author/:userId",
  checkValiObjectdId,
  productController.getProductsByAuthorWithPagination,
);
router.get("/products/:productId", productController.getProductById);
router.get(
  "/products/category/:categoryId",
  productController.getProductsByCategoryWithPagination,
);

export { router as ProductRoutes };
