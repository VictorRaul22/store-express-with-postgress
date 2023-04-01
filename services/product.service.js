// const { faker } = require('@faker-js/faker');
const boon = require('@hapi/boom');
const { models } = require('../libs/sequelize');
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
  async find() {
    const products = await models.Product.findAll({
      include: ['category'],
    });
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
