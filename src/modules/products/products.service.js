import { productsModel } from "./products.model.js";
import { validateProductData } from "./utils/validate-product-data.js";
import { createHttpError } from "../../utils/http-error.js";

const getAll = async () => {
  try {
    const products = await productsModel.getAll();
    return products;
  } catch (error) {
    console.log("Service error - getAll:", error);
    throw createHttpError(500, "Error while fetching products");
  }
};

const getById = async (id) => {
  try {
    const product = await productsModel.getById(id);
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    return product;
  } catch (error) {
    if (error.isHttpError) throw error;
    throw createHttpError(500, "Error while fetching product by ID");
  }
};

const create = async (productData) => {
  validateProductData(productData);
  try {
    const newProduct = await productsModel.create(productData);
    return newProduct;
  } catch (error) {
    console.log("Service error - create:", error);
    throw createHttpError(500, "Error while creating product");
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await productsModel.deleteById(id);
    if (!deleted) {
      throw createHttpError(404, "Product not found");
    }
    return deleted;
  } catch (error) {
    console.log("Service error - deleteById:", error);
    if (error.isHttpError) throw error;
    throw createHttpError(500, "Error while deleting product");
  }
};

const update = async (id, updateData) => {
  validateProductData(updateData);
  try {
    const updatedProduct = await productsModel.update(id, updateData);
    if (!updatedProduct) {
      throw createHttpError(404, "Product not found");
    }
    return updatedProduct;
  } catch (error) {
    console.log("Service error - update:", error);
    if (error.isHttpError) throw error;
    throw createHttpError(500, "Error while updating product");
  }
};

export const productsService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
