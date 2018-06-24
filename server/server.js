const port = process.env.PORT || 3000;
const { mongoose } = require('./db/mongoose');
const _ = require('lodash');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')
var app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then( doc => {
    console.log("save thanh cong: ", doc)
    res.send(doc)
  }, err => {
    res.status(400).send(err)
    console.log("err: ")
  })
})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    console.log("get:: ", todos)
    res.send({
      todos,
      code: 200
    })
  }, err => {
    res.status(400).send(err)
  })
})

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send()
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    console.log("token: ", token)
    console.log("user: ", user)
    res.header('x-auth', token).send(user)
  }).catch((err) => {
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

app.get('/users/me', authenticate, (req, res) => {
  // var token = req.header('x-auth');
  // User.findByToken(token).then((user) => {
  //   if (!user) {
      
  //   }
  //   res.send(user)
  // }).catch((e) => {
  //   res.status(401).send();
  // })
  res.send(req.user);
})

// POST /users/login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then(user => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user)
    })
  }).catch(e => {
    res.status(400).send();
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})
app.listen(port, () => {
  console.log(`start on port ${port}`)
})

module.exports = {app}