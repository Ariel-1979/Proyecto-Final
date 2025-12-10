import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notFoundMiddleware from "./src/middlewares/not-found.js";

dotenv.config();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send({ message: "API is working" });
});

app.get("/auth", (req, res) => {
  res.send({ message: "Ruta Login" });
});

app.get("/products", (req, res) => {
  res.send({ message: "Ruta de productos" });
});

// Middleware for handling 404 - Not Found
app.use(notFoundMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
