import { Router } from "express";
import commentController from "../controllers/comment.controller.js";

export const router = Router();

router.post("/comment", commentController.createComment);
router.put("/comment", commentController.updateComment);
router.delete("/comment/:id", commentController.deleteComment);

