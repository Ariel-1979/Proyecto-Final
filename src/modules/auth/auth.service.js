import { hashPassword } from "./utils/password-hash.js";
import { authModel } from "./auth.model.js";
import { createHttpError } from "../../utils/http-error.js";

const register = async (username, password) => {
  try {
    const existingUser = await authModel.findUserByUsername(username);
    if (existingUser) {
      const error = new Error("Username already taken");
      error.status = 400;
      throw error;
    }
    const passwordHashed = await hashPassword(password);
    const userRegistered = await authModel.register({
      username,
      password: passwordHashed,
    });

    return userRegistered;
  } catch (error) {
    console.log("Service error - Register:", error);
    throw createHttpError(error.status || 500, error.message || "Server error");
  }
};

const login = (req, res) => {
  res.send({ message: "Ruta de productos" });
};

export const authService = {
  login,
  register,
};
