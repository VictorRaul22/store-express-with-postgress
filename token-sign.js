const jwt = require('jsonwebtoken');
const secret = 'myCat'; //.env
const payload = {
  sub: 1, //forma en la identifica al user
  role: 'customer',
};
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}
const token = signToken(payload, secret);
console.log(token);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MDQxNjUyNn0.AV5EMbi3riUBz_M9lCRv7Dm_zRUt2MBIGHU77ByXALs
