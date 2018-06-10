const port = process.env.PORT || 3000;
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb')
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

app.post('/users', (req, res) => {
  var user = new User({
    email: req.body.email
  })

  user.save().then( doc => {
    console.log("save thanh cong: ", doc)
    res.send(doc)
  }, err => {
    res.status(400).send(err)
    console.log("err: ")
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos,
      code: 200
    })
  }, err => {
    res.status(400).send(err)
  })
})
app.listen(port, () => {
  console.log(`start on port ${port}`)
})

app.get('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send()
  }

  Todo.findById(req.params.id).then((todo) => {
    res.send({todo})
  })
})