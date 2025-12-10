import { productsModel } from "./products.model.js";
import { validateProductData } from "./utils/validate-product-data.js";

const getAll = async () => {
  try {
    const products = await productsModel.getAll();
    return products;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error in service while fetching products: " + error.message
    );
  }
};

const getById = async (id) => {
  console.log("Service: Fetching product with ID:", id);
  try {
    const product = await productsModel.getById(id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error in service while fetching product by ID: " + error.message
    );
  }
};

const create = async (productData) => {
  if (validateProductData(productData) !== true) {
    throw new Error("Product data validation failed");
  }
  try {
    const newProduct = await productsModel.create(productData);
    return newProduct;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error in service while creating product: " + error.message
    );
  }
};

export const productsService = {
  getAll,
  getById,
  create,
};
