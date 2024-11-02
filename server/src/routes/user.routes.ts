import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
  verifyUserOwnershipOrAdminRole,
  isUserOwnerOrAdmin,
} from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
  validUsername,
} from "../middlewares/requestValidation.middleware";
import { userInputSchema } from "../validation-schemas/user.validation";

const router = Router();

router.get("/users/", validPagination, userController.getUsersWithPagination);
router.put(
  "/users/",
  authMiddleware,
  validateSchemaBody(userInputSchema),
  userController.updateUser,
);
router.delete(
  "/users/:userId",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  verifyUserOwnershipOrAdminRole("userId"),
  userController.deleteUser,
);
router.get(
  "/users/:userId",
  validateObjectIdParams(["userId"]),
  userController.getUserById,
);
router.get("/users/:username", validUsername, userController.getUserByUsername);

// -------------------------------- cart ------------------
router.get(
  "/users/:userId/cart",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  userController.getUserCart,
);
router.post(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userController.addProductToCart,
);
router.delete(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userController.removeProductFromCart,
);
// -------------------------------- cart ------------------
// -------------------------------- saved products ------------------
router.get(
  "/users/:userId/saved-products",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  userController.getUseSavedProducts,
);
router.post(
  "/users/:userId/saved-products/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userController.addProductToSavedProducts,
);
router.delete(
  "/users/:userId/saved-products/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userController.removeProductFromSavedProducts,
);
// -------------------------------- saved products ------------------
// -------------------------------- wishlist ------------------
router.get(
  "/users/:userId/wishlist",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  userController.getUseWishlist,
);
router.post(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userController.addProductToWishlist,
);
router.delete(
  "/users/:userId/wishlist/:productId",
  authMiddleware,

  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userController.removeProductFromWishlist,
);
// -------------------------------- wishlist ------------------

export { router as UserRoutes };
