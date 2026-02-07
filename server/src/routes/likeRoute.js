import { Router } from "express";
import { likeBlog } from "../controllers/likeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const likeRouter = Router();

likeRouter.post("/:id/like", authMiddleware, likeBlog);

export default likeRouter;
