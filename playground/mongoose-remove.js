const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

var id = '5b1bdd04b73e3c46ac5ad64a';

Todo.findOneAndRemove({
  _id: id
}).then((result) => {
  console.log("ket qua ", result)
}, (err) => {
  console.log("co loi xay ra: ", err)
})