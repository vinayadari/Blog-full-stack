import { Router } from "express";
import getFeed from "../controllers/feedController.js";
const feedRoute = Router();

feedRoute.get("/", getFeed);

export default feedRoute;
