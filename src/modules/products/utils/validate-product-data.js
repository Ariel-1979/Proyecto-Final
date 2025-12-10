export const validateProductData = (data) => {
  if (!data.name || typeof data.name !== "string") {
    throw new Error("Invalid or missing 'name' field");
  }
  if (data.price == null || typeof data.price !== "number") {
    throw new Error("Invalid or missing 'price' field");
  }
  if (data.name == null || typeof data.name !== "string") {
    throw new Error("Invalid or missing 'name' field");
  }
  if (
    !data.categories ||
    typeof data.categories !== "object" ||
    !Array.isArray(data.categories)
  ) {
    throw new Error("Invalid or missing 'categories' field");
  }
  return true;
};
