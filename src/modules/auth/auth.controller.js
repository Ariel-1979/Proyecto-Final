const getAll = (req, res) => {
  res.send({ message: "Ruta de productos" });
};

const getById = (req, res) => {
  res.send({ message: `Ruta de producto con ID: ${req.params.id}` });
};

const create = (req, res) => {
  res.send({ message: "Crear un nuevo producto" });
};

const update = (req, res) => {
  res.send({ message: `Actualizar producto con ID: ${req.params.id}` });
};

const softDelete = (req, res) => {
  res.send({ message: `Eliminar producto con ID: ${req.params.id}` });
};

export const authController = {
  getAll,
  getById,
  create,
  update,
  softDelete,
};
