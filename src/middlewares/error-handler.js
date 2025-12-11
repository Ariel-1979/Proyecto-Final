export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("Global Error Handler:", err);

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    error: message,
  });
};
