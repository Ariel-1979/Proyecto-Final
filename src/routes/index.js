import PruductsRouter from "../modules/products/products.routes.js";
import AuthRouter from "../modules/auth/auth.routes.js";
import { verifyToken } from "../middlewares/verify-token.js";

import { Router } from "express";
const router = Router();

router.use("/api", verifyToken, PruductsRouter);
router.use("/auth", AuthRouter);

export default router;
