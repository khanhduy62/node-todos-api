const { MongoClient, ObjectId } = require('mongodb');
const moment = require('moment');

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
// const dbName = 'myNewDatabase';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  if (err) {
    return console.log("no connection");
  }
    console.log("Connect successfully ::::");

    var dbo = client.db("TodoApp");
    var myobj = { name: "SmartDev Inc", address: "Highway 37" };
    dbo.collection('Todos').insertOne(myobj, (err, result) => {
      if (err) throw err;
      console.log("1 document inserted ", JSON.stringify(result.ops));
    });
    // dbo.collection("Todos").find({$or: [{"name" : "SmartDev IncAB"}, {"_id": ObjectId('5b002d54d4ce327a5fbe36a5')}]}).toArray(function(err, result) {
    //   if (err) throw err;
    //   // console.log(moment(result[0]._id.getTimestamp()).format('hh:mm:ss a'));
    //   console.log(result);
    // });
    client.close();
});