import { Router } from "express";
import { loginAdmin } from "../controllers/admin.controllers";
import { validateSchema } from "../middlewares/validateSchema";
import { adminSchema } from "../schemas/admin.schemas";

export const adminRoutes = Router()

adminRoutes.post('/', validateSchema(adminSchema), loginAdmin)