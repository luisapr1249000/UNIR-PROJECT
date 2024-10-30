import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { checkUserOrAdmin } from "../middlewares/checkUserOrAdmin";

const router = Router();

router.get("/users/", authMiddleware, userController.getUsersWithPagination);
router.put("/users/", authMiddleware, userController.updateUser);
router.delete(
  "/users/:userId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  userController.deleteUser,
);
router.get("/users/:userId", checkValiObjectdId, userController.getUserById);
router.get("/users/:username", userController.getUserByUsername);

// -------------------------------- cart ------------------
router.get(
  "/users/:userId/cart",
  checkValiObjectdId,
  checkUserOrAdmin,
  userController.getUserCart,
);
router.post(
  "/users/:userId/cart/:productId",
  authMiddleware,

  checkValiObjectdId,
  checkUserOrAdmin,
  userController.addProductToCart,
);
router.delete(
  "/users/:userId/cart/:productId",
  authMiddleware,

  checkValiObjectdId,
  checkUserOrAdmin,
  userController.removeProductFromCart,
);
// -------------------------------- cart ------------------
// -------------------------------- saved products ------------------
router.get(
  "/users/:userId/products-saved",
  checkValiObjectdId,
  checkUserOrAdmin,
  userController.getUseSavedProducts,
);
router.post(
  "/users/:userId/products-saved/:productId",
  authMiddleware,

  checkValiObjectdId,
  checkUserOrAdmin,
  userController.addProductToSavedProducts,
);
router.delete(
  "/users/:userId/products-saved/:productId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,

  userController.removeProductFromSavedProducts,
);
// -------------------------------- saved products ------------------

// -------------------------------- wishlist ------------------
router.get(
  "/users/:userId/wishlist",
  checkValiObjectdId,
  userController.getUseWishlist,
);
router.post(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  checkValiObjectdId,
  userController.addProductToWishlist,
);
router.delete(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  checkValiObjectdId,
  userController.removeProductFromWishlist,
);
// -------------------------------- wishlist ------------------

export { router as UserRoutes };
