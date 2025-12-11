export const createHttpError = (status, message, code) => ({
  status,
  message,
  code,
  isHttpError: true,
});
