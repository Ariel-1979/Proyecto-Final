import jwt from "jsonwebtoken";

const token = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const JWT = {
  token,
  verify,
};
