const { MongoClient, ObjectId } = require('mongodb');
const moment = require('moment');

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myNewDatabase';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  if (err) {
    return console.log("no connection");
  }
    console.log("Connect successfully ::::");

    var dbo = client.db("TodoApp");

    var myquery = { address: "Highway 37" };
    var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
    dbo.collection("Todos").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });

});