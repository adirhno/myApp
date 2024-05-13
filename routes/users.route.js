import { Router } from "express";
import usersController from "../controllers/user.controller.js";

 export const router = Router();

router.post("/user", usersController.trackUser);
router.get("/user/:email", usersController.getUserPosts);

