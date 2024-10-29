import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/authMiddleware";

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
  productController.updateProduct,
);
router.delete(
  "/products/:productId",
  authMiddleware,
  productController.deleteProduct,
);
router.get(
  "/products/author:authorId",
  productController.getProductsByAuthorWithPagination,
);
router.get("/products/:productId", productController.getProductById);

export { router as ProductRoutes };
