import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import modulesRouter from "./src/routes/index.js";
import { notFoundMiddleware } from "./src/middlewares/not-found.js";
import { errorHandlerMiddleware } from "./src/middlewares/error-handler.js";
import { corsOptions } from "./src/utils/cors-options.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes from modules
app.use("/", modulesRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Middleware for handling 404 and errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
s;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
