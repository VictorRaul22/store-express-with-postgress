const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');

const service = new UserService();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};
const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await service.findOne(payload.sub);
    if (!user) done(boom.unauthorized(), false);
    return done(null, payload);
  } catch (err) {
    done(err, false);
  }
  // return done(null, payload);
});
module.exports = JwtStrategy;
