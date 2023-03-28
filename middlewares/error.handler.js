const { ValidationError } = require('sequelize');
function logErrors(err, req, res, next) {
  console.log(err);
  next(err); //middleware de tipo error
}
function errorHandler(err, req, res, next) {
  res.status(500).json(err);
}
function boomErrorHandler(err, req, res, next) {
  if (!err.isBoom) next(err);
  const { output } = err;
  res.status(output.statusCode).json(output.payload);
}

function ormErrorHandler(err, req, res, next) {
  if (!(err instanceof ValidationError)) next(err);
  res.status(409).json({
    statusCode: 409,
    message: err.name,
    errors: err.errors,
  });
  // const { output } = err;
  // res.status(output.statusCode).json(output.payload);
}
module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
};
