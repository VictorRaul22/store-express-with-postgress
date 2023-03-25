const boon = require('@hapi/boom');

// se crea un middleware de forma dinamica con closure
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // body,params,query
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) next(boon.badRequest(error)); // se envia a middlewar de tipo error
    next();
  };
}
module.exports = validatorHandler;
