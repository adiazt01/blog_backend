import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admin.controllers";
import { validateSchema } from "../middlewares/validateSchema";
import { adminSchema } from "../schemas/admin.schemas";

export const adminRoutes = Router()

adminRoutes.post('/login', validateSchema(adminSchema), loginAdmin)
adminRoutes.get('/logout', logoutAdmin)