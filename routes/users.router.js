const express = require('express');
// const { faker } = require('@faker-js/faker');

const router = express.Router();
const UsersService = require('../services/user.service');

const service = new UsersService();
router.get('/', (req, res) => {
  // const { limit, offset } = req.query;
  // if (limit && offset) {
  //   res.json({
  //     limit,
  //     offset,
  //   });
  // } else {
  //   res.send('No hay parametros');
  // }
  const users = service.find();
  res.json(users);
});

module.exports = router;
