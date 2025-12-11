import { productsService } from "./products.service.js";

const getAll = async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.json(products);
  } catch (error) {
    console.log("Controller error - getAll:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

const getById = async (req, res) => {
  try {
    const product = await productsService.getById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log("Controller error - getById:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

const create = async (req, res) => {
  try {
    const newProduct = await productsService.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Controller error - create:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

const deleteById = async (req, res) => {
  try {
    await productsService.deleteById(req.params.id);
    res.json({
      message: `Producto con ID: ${req.params.id} eliminado correctamente`,
    });
  } catch (error) {
    console.log("Controller error - deleteById:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

const update = async (req, res) => {
  try {
    const updatedProduct = await productsService.update(
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  } catch (error) {
    console.log("Controller error - update:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

export const productsController = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
