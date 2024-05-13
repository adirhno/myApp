import { Router } from "express";
import feedController from "../controllers/feed.controller.js";

export const router = Router();

router.get("/feed/:email", feedController.getFollowersPosts);



