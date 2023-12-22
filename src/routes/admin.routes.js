import { Router } from "express";
import {
	createPost,
	deletePost,
	getPost,
	getPosts,
	loginAdmin,
	logoutAdmin,
	updatePost,
} from "../controllers/admin.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { adminSchema } from "../schemas/admin.schemas.js";
import { validateToken } from "../middlewares/validateToken.js";
import { postSchema } from "../schemas/post.schema.js";

export const adminRoutes = Router();

// auth routes
adminRoutes.post("/login", validateSchema(adminSchema), loginAdmin);
adminRoutes.get("/logout", logoutAdmin);

// cms routes
adminRoutes.get("/posts", validateToken, getPosts);
adminRoutes.post(
	"/posts",
	[validateToken, validateSchema(postSchema)],
	createPost,
);
adminRoutes.get("/posts/:id", validateToken, getPost);
adminRoutes.put(
	"/posts/:id",
	[validateToken, validateSchema(postSchema)],
	updatePost,
);
adminRoutes.delete("/posts/:id", validateToken, deletePost);
