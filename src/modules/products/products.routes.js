import { Router } from "express";
import { productsController } from "./products.controller.js";
const router = Router();

router.get("/products", productsController.getAll);

router.get("/product/:id", productsController.getById);

router.post("/product", productsController.create);

router.delete("/product/:id", productsController.deleteById);

router.put("/product/:id", productsController.update);

export default router;
