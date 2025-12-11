import { hashPassword, comparePassword } from "./utils/password-hash.js";
import { authModel } from "./auth.model.js";
import { createHttpError } from "../../utils/http-error.js";
import { JWT } from "./utils/jwt.js";

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

const login = async (username, password) => {
  try {
    const existingUser = await authModel.findUserByUsername(username);
    if (!existingUser) {
      const error = new Error("Invalid username or password");
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      const error = new Error("Invalid username or password");
      error.status = 401;
      throw error;
    }

    const token = JWT.token({
      id: existingUser.id,
      username: existingUser.username,
    });
    existingUser.token = token;

    const { password: _, ...userWithoutPassword } = existingUser;
    return userWithoutPassword;
  } catch (error) {
    console.log("Service error - Login:", error);
    throw createHttpError(error.status || 500, error.message || "Server error");
  }
};

export const authService = {
  login,
  register,
};
