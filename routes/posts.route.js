import { Router } from "express";
import postsController from "../controllers/post.controller.js";

export const router = Router();

router.post("/post", postsController.createPost);
router.get("/post/:email", postsController.getPostsByUserEmail);
router.put("/post/:id/:like", postsController.updatePostLikes);
router.put("/post/:id/:text", postsController.updatePost);
router.delete("/post/:text", postsController.deletePost);


