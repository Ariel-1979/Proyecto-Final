import { createHttpError } from "../../../utils/http-error.js";

export const validateProductData = (data) => {
  if (!data || typeof data !== "object") {
    throw createHttpError(422, "Invalid request body");
  }

  if (!data.name || typeof data.name !== "string") {
    throw createHttpError(422, "Invalid or missing 'name' field");
  }

  if (data.price == null || typeof data.price !== "number") {
    throw createHttpError(422, "Invalid or missing 'price' field");
  }

  if (!Array.isArray(data.categories)) {
    throw createHttpError(422, "Invalid or missing 'categories' field");
  }

  return true;
};
