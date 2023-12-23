import { Router } from "express";
import {getAllPosts, getLastsFivePost, searchPosts } from "../controllers/post.controllers.js";

export const postRoutes = Router();

postRoutes.get("/search/:search", searchPosts);
postRoutes.get("/", getAllPosts)
postRoutes.get("/lasts", getLastsFivePost); 