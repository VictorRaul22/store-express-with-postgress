const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');

const service = new AuthService();
const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);
module.exports = LocalStrategy;
