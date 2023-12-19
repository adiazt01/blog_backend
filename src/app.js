import express from 'express';
import { postRoutes } from './routes/post.routes';
import { adminRoutes } from './routes/admin.routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

export const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);