'use strict';
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    });
    const hash = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'admin@domain.com',
        password: hash,
        role: 'admin',
        create_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};
