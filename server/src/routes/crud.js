import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/crudController.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const crudRouter = Router();

crudRouter.post("/", authMiddleware, createBlog);
crudRouter.get("/", authMiddleware, getBlogs);
crudRouter.patch("/:id", authMiddleware, updateBlog);
crudRouter.delete("/:id", authMiddleware, deleteBlog);

export default crudRouter;
