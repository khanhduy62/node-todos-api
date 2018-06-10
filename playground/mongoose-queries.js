const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

var id = '5b1befb7bdaf781199fcda05';

Todo.find({
  _id: id
}).then((result) => {
  console.log("ket qua ", result)
}, (err) => {
  console.log("co loi xay ra: ", err)
})