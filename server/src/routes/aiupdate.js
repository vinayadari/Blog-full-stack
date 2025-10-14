import { enhanceBlog } from "../controllers/aiUpdateContent.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const enhanceRouter = Router();

enhanceRouter.put("/:id", authMiddleware, enhanceBlog);

export default enhanceRouter;
