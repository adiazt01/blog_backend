import { Router } from "express";
import { createPost } from "../controllers/post.controllers";

export const postRoutes = Router()

postRoutes.post('/', createPost)