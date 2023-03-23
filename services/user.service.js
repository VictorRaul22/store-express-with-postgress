const { faker } = require('@faker-js/faker');
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 30;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        // imagen: faker.image.imageUrl(),
      });
    }
  }
  find() {
    return this.users;
  }
}
module.exports = UsersService;
