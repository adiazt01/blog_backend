import express from 'express';
import { postRoutes } from './routes/post.routes';
import { adminRoutes } from './routes/admin.routes';

export const app = express();

app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);