import { Router } from "express";
import getFeed from "../controllers/feedController.js";
import { optionalAuthMiddleware } from "../middleware/authMiddleware.js";

const feedRoute = Router();

feedRoute.get("/", optionalAuthMiddleware, getFeed);

export default feedRoute;
