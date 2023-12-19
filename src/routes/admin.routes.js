import { Router } from "express";
import { getPosts, loginAdmin, logoutAdmin } from "../controllers/admin.controllers";
import { validateSchema } from "../middlewares/validateSchema";
import { adminSchema } from "../schemas/admin.schemas";
import { validateToken } from "../middlewares/validateToken";

export const adminRoutes = Router()

adminRoutes.post('/login', validateSchema(adminSchema), loginAdmin)
adminRoutes.get('/logout', logoutAdmin)

adminRoutes.get('/posts', validateToken, getPosts)