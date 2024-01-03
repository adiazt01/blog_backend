import express from "express";
import { postRoutes } from "./routes/post.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const app = express();

export const prisma = new PrismaClient({
	datasources: { db: { url: process.env.DATABASE_URL } },
});

app.use(
	cors({
		origin:["http://localhost:5173", "https://blog-frontend-h0be.onrender.com"],
		credentials: true,
	}),
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined"));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
