import { Router } from "express";
const router = Router();

router.get("/products", (req, res) => {
  res.send({ message: "Ruta de productos" });
});

router.get("/product/:id", (req, res) => {
  res.send({ message: `Ruta de producto con ID: ${req.params.id}` });
});

router.post("/product", (req, res) => {
  res.send({ message: "Crear un nuevo producto" });
});

router.put("/product/:id", (req, res) => {
  res.send({ message: `Actualizar producto con ID: ${req.params.id}` });
});

router.delete("/product/:id", (req, res) => {
  res.send({ message: `Eliminar producto con ID: ${req.params.id}` });
});

export default router;
