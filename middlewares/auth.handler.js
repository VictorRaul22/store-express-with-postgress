const { config } = require('./../config/config');
const boom = require('@hapi/boom');
function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey !== config.apiKey) next(boom.unauthorized());
  else next();
}
module.exports = { checkApiKey };
