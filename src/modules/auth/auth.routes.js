import { Router } from "express";
const router = Router();

router.get("/auth", (req, res) => {
  res.send({ message: "Ruta de Login" });
});

router.get("/auth/:id", (req, res) => {
  res.send({ message: `Ruta de Login con ID: ${req.params.id}` });
});

router.post("/auth", (req, res) => {
  res.send({ message: "Crear un nuevo Login" });
});

router.put("/auth/:id", (req, res) => {
  res.send({ message: `Actualizar Login con ID: ${req.params.id}` });
});

router.delete("/auth/:id", (req, res) => {
  res.send({ message: `Eliminar Login con ID: ${req.params.id}` });
});

export default router;
