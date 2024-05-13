import { Router } from "express";
import searchController from "../controllers/search.controller.js";

export const router = Router();

router.get("/search/:first/:last", searchController.getUserByFullname);
router.get("/search/:text", searchController.getPostByText);
