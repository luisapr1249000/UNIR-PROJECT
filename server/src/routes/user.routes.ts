import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/users/", authMiddleware, userController.getUsersWithPagination);
router.put("/users/", authMiddleware, userController.updateUser);
router.delete("/users/:userId", authMiddleware, userController.deleteUser);
router.get("/users/:userId", userController.getUserById);
router.get(
  "/users/:username",
  authMiddleware,
  userController.getUserByUsername,
);

// -------------------------------- cart ------------------
router.get("/users/:userId/cart", userController.getUserCart);
router.post("/users/:userId/cart/:productId", userController.addProductToCart);
router.delete(
  "/users/:userId/cart/:productId",
  userController.removeProductFromCart,
);
// -------------------------------- cart ------------------
// -------------------------------- saved products ------------------
router.get("/users/:userId/products-saved", userController.getUseSavedProducts);
router.post(
  "/users/:userId/products-saved/:productId",
  userController.addProductToSavedProducts,
);
router.delete(
  "/users/:userId/products-saved/:productId",
  userController.removeProductFromSavedProducts,
);
// -------------------------------- saved products ------------------

// -------------------------------- wishlist ------------------
router.get("/users/:userId/wishlist", userController.getUseWishlist);
router.post(
  "/users/:userId/wishlist/:productId",
  userController.addProductToWishlist,
);
router.delete(
  "/users/:userId/wishlist/:productId",
  userController.removeProductFromWishlist,
);
// -------------------------------- wishlist ------------------

export { router as UserRoutes };
