import { Router } from "express";
import {
  getAllPosts,
  getLastsFivePost,
  searchPosts,
  getPostById,
  getCountPosts,
} from "../controllers/post.controllers.js";

export const postRoutes = Router();

postRoutes.get("/", getAllPosts);
postRoutes.get("/search/:search", searchPosts);
postRoutes.get("/count", getCountPosts);
postRoutes.get("/lasts", getLastsFivePost);
postRoutes.get("/:id", getPostById);
