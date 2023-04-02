const jwt = require('jsonwebtoken');
const secret = 'myCat'; //.env
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MDQxNjUyNn0.AV5EMbi3riUBz_M9lCRv7Dm_zRUt2MBIGHU77ByXALs';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
const isVerify = verifyToken(token, secret);
console.log(isVerify); //true
