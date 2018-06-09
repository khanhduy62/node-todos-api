var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then( doc => {
    console.log("save thanh cong: ", doc)
    res.send(doc)
  }, err => {
    res.status(400).send(err)
    console.log("err: ")
  })
})
app.listen(3000, () => {
  console.log("start on port 3000")
})