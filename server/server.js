const port = process.env.PORT || 3000;
const { mongoose } = require('./db/mongoose');
const _ = require('lodash')
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')
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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    console.log("get:: ", todos)
    res.send({
      todos,
      code: 200
    })
  }, err => {
    res.status(400).send(err)
  })
})

app.get('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send()
  }

  Todo.findById(req.params.id).then((todo) => {
    res.send({todo})
  })
})

app.delete('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send()
  }

  Todo.findOneAndRemove({
    _id: req.params.id
  }).then((result) => {
    console.log("remove thanh cong", result)
    res.status(200).send();
  }, (err) => {
    console.log("co loi xay ra: ", err)
    res.status(400).send();
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send()
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, { new: true }).then((todo) => {
    res.status(200).send();
  }, (err) => {
    res.status(400).send();
  })
})

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }, (err) => {
    res.status(400).send(err);
  })
})


app.get('/users', (req, res) => {
  User.find().then((users) => {
    console.log("get:: ", users)
    res.send({
      users,
      code: 200
    })
  }, err => {
    res.status(400).send(err)
  })
})
app.listen(port, () => {
  console.log(`start on port ${port}`)
})

module.exports = {app}