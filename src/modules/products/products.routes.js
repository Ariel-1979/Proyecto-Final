import { Router } from "express";
import { productsController } from "./products.controller.js";
const router = Router();

router.get("/products", productsController.getAll);

router.get("/product/:id", productsController.getById);

router.post("/product", productsController.create);

router.put("/product/:id", productsController.update);

router.delete("/product/:id", productsController.softDelete);

export default router;
