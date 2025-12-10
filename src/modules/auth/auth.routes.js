import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.get("/auth", authController.getAll);

router.get("/auth/:id", authController.getById);

router.post("/auth", authController.create);

router.put("/auth/:id", authController.update);

router.delete("/auth/:id", authController.softDelete);

export default router;
