import jwt from "jsonwebtoken";

const token = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const verify = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export const JWT = {
  token,
  verify,
};
