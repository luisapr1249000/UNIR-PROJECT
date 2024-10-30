import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import commentController from "../controllers/comment.controller";
import { checkValiObjectdId } from "../middlewares/checkObjectId";
import { checkUserOrAdmin } from "../middlewares/checkUserOrAdmin";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get(
  "/comments/",
  authMiddleware,
  isAdmin,
  commentController.getAllComments,
);
router.get(
  "/comments/user/:userId",
  isAdmin,
  checkValiObjectdId,
  commentController.getUserComments,
);

router.get(
  "/products/:postId/comments/",
  checkValiObjectdId,
  commentController.getCommentsFromProduct,
);
router.get(
  "/products/:postId/comments/:commentId",
  checkValiObjectdId,
  commentController.getCommentById,
);

router.post(
  "/products/:postId/comments/:commentId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  commentController.createComment,
);
router.put(
  "/products/:postId/comments/:commentId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  commentController.updateComment,
);

router.delete(
  "/products/:postId/comments/:commentId",
  authMiddleware,
  checkValiObjectdId,
  checkUserOrAdmin,
  commentController.deleteComment,
);

export { router as CommentRoutes };
