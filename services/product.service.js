// const { faker } = require('@faker-js/faker');
const boon = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
// const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    // this.products = [];
    // this.generate();
  }
  // generate() {
  //   const limit = 100;
  //   for (let i = 0; i < limit; i++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price()),
  //       imagen: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) throw boon.notFound('product not found');
    // if (product.isBlock) throw boon.conflict('product is block');
    return product;
  }
  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = product.update(changes);

    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return {
      id,
    };
  }
}
module.exports = ProductsService;
