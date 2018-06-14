const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
var message = 'I am user number 3';
var hash = SHA256(message).toString();
console.log("hash: ", hash);

var data = {
  id: 4
}

var token = jwt.sign(data, '123abc');
console.log("token ", token)

var decode = jwt.verify(token, '123abc')
console.log("decode: ", decode)
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