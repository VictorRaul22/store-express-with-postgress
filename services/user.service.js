// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.log(err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.notFound('user not found');

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
