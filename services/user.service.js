const boom = require('@hapi/boom');
// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.log(err));
  }

  async create(data) {
    return data;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
