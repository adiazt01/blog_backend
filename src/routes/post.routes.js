import { Router } from "express";
import { createPost } from "../controllers/post.controllers.js";

export const postRoutes = Router();

postRoutes.post("/", createPost);
