var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test123@ds153890.mlab.com:53890/db-todos' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}