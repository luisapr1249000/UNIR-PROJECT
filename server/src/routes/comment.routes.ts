import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import commentController from "../controllers/comment.controller";
import {
  isAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/checkUserOrAdmin.middleware";
import { commentInputSchema } from "../validation-schemas/comment.validation";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";

const router = Router();

router.get(
  "/comments/",
  authMiddleware,
  isAdmin,
  validPagination,
  commentController.getAllComments,
);
router.get(
  "/comments/user/:userId",
  isAdmin,
  validPagination,
  validateObjectIdParams(["userId"]),

  commentController.getUserComments,
);

router.get(
  "/products/:productId/comments/",
  validPagination,
  validateObjectIdParams(["productId"]),
  commentController.getCommentsFromProduct,
);
router.get(
  "/products/:productId/comments/:commentId",
  validateObjectIdParams(["productId", "commentId"]),
  commentController.getCommentById,
);

router.post(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  validateObjectIdParams(["productId", "commentId"]),
  validateSchemaBody(commentInputSchema),
  commentController.createComment,
);
router.put(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("commentId"),
  validateObjectIdParams(["productId", "commentId"]),
  validateSchemaBody(commentInputSchema),
  commentController.updateComment,
);

router.delete(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("commentId"),
  validateObjectIdParams(["productId", "commentId"]),
  commentController.deleteComment,
);

export { router as CommentRoutes };
