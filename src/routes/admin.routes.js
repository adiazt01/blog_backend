import { Router } from "express";
import {
  createPost,
  getPosts,
  loginAdmin,
  logoutAdmin,
} from "../controllers/admin.controllers";
import { validateSchema } from "../middlewares/validateSchema";
import { adminSchema } from "../schemas/admin.schemas";
import { validateToken } from "../middlewares/validateToken";
import { postSchema } from "../schemas/post.schema";

export const adminRoutes = Router();

// auth routes
adminRoutes.post("/login", validateSchema(adminSchema), loginAdmin);
adminRoutes.get("/logout", logoutAdmin);

// cms routes
adminRoutes.get("/posts", validateToken, getPosts);
adminRoutes.post("/posts", [validateToken, validateSchema(postSchema)], createPost);