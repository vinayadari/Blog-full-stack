import { Router } from "express";
import {
    addComment,
    getComments,
    deleteComment,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const commentRouter = Router();

// Get comments for a blog (public)
commentRouter.get("/:blogId/comments", getComments);

// Add comment to a blog (auth required)
commentRouter.post("/:blogId/comments", authMiddleware, addComment);

// Delete a comment (auth required, only owner)
commentRouter.delete("/:blogId/comments/:commentId", authMiddleware, deleteComment);

export default commentRouter;
