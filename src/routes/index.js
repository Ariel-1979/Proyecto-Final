import PruductsRouter from "../modules/products/products.routes.js";
import AuthRouter from "../modules/auth/auth.routes.js";

import { Router } from "express";
const router = Router();

router.use("/", PruductsRouter);
router.use("/", AuthRouter);

export default router;
