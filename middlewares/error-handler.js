const errorHandler = ((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).send({ message: status === 500 ? 'Ошибка сервера' : err.message });
  next();
});

module.exports = errorHandler;
