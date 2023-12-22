import express from "express";
import { postRoutes } from "./routes/post.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


export const app = express();
console.log(process.env.DATABASE_URL);
console.log(process.env.NODE_ENV);
export const prisma = new PrismaClient({datasources: {db: {url: process.env.DATABASE_URL}}});

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
