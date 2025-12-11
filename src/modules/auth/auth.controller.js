import { validateUser } from "./utils/validate-user.js";
import { hashPassword } from "./utils/password-hash.js";
import { authService } from "./auth.service.js";

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    validateUser(username, password);
    const userRegistered = await authService.register(username, password);

    res.json(userRegistered);
  } catch (error) {
    console.log("Controller error - Register:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    validateUser(username, password);

    const userRegistered = await authService.login(username, password);

    res.json(userRegistered);
  } catch (error) {
    console.log("Controller error - Register:", error);
    const status = error.status || 500;
    res.status(status).json({ error: error.message || "Server error" });
  }
};

export const authController = {
  login,
  register,
};
