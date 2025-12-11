import { createHttpError } from "../../../utils/http-error.js";

export const validateUser = (username, password) => {
  if (!username || !password) {
    throw createHttpError(422, "Username and password are required");
  }
  return null;
};
