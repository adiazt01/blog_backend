import express from "express";
import { postRoutes } from "./routes/post.routes";
import { adminRoutes } from "./routes/admin.routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

export const app = express();
export const prisma = new PrismaClient();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
