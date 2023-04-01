const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}
  async create(data) {
    // const newUser = await models.User.create(data.user);
    // const customer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id,
    // });
    // al estar associado sequelize recone al campo user y lo crea con solo la siguiente indicación
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!customer) throw boom.notFound('customer not found');
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;