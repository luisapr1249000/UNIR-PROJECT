import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import commentController from "../controllers/comment.controller";

const router = Router();

router.get("/comments/", commentController.getAllComments);
router.get("/comments/user/:userId", commentController.getUserComments);

router.get(
  "/products/:postId/comments/",
  commentController.getCommentsFromProduct,
);
router.get(
  "/products/:postId/comments/:commentId",
  commentController.getCommentById,
);

router.post(
  "/products/:postId/comments/:commentId",
  authMiddleware,
  commentController.createComment,
);
router.put(
  "/products/:postId/comments/:commentId",
  authMiddleware,
  commentController.updateComment,
);

router.delete(
  "/products/:postId/comments/:commentId",
  authMiddleware,
  commentController.deleteComment,
);

export { router as CommentRoutes };
