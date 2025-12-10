import { productsService } from "./products.service.js";

const getAll = async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await productsService.getById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = (req, res) => {
  res.send({ message: "Crear un nuevo producto" });
};

const update = (req, res) => {
  res.send({ message: `Actualizar producto con ID: ${req.params.id}` });
};

const softDelete = (req, res) => {
  res.send({ message: `Eliminar producto con ID: ${req.params.id}` });
};

export const productsController = {
  getAll,
  getById,
  create,
  update,
  softDelete,
};
