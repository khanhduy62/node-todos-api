const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = '123abc!';

bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
      // Store hash in your password DB.
      console.log("hash ", hash)
  });
});

var hashedPassword = '$2a$10$ZnNwrrjMpHluxWI9HHYy/OoVpSi8u.eIZvBIfd2ZZLx.wBAlW/aHC';
bcrypt.compare(password, hashedPassword, function(err, res) {
  // res === true
  console.log("compared ", res)
});
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log("hash: ", hash);

// var data = {
//   id: 4
// }

// var token = jwt.sign(data, '123abc');
// console.log("token ", token)

// var decode = jwt.verify(token, '123abc')
// console.log("decode: ", decode)
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret' ).toString();

// if (resultHash === token.hash) {
//   console.log("trung hash");
// } else {
//   console.log("khong trung hash");
// }