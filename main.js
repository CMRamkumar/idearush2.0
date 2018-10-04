const express = require('express');
const app = new express();
const path = require("path");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.load();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve the project folder.
});
app.listen(3000);
app.post('/insert/data', function(req, res){
  var data = req.body;
  console.log(data);
  var MongoClient = require('mongodb').MongoClient;
  var uri = "mongodb+srv://" + process.env.ACCESS_NAME + ":" + process.env.ACCESS_CODE + "@idearush2-i1vog.mongodb.net/Idearush2?retryWrites=true";
  MongoClient.connect(uri, function(err, client) {
     const collection = client.db("Idearush2").collection("idearush");
     collection.insertOne(data).then(function(result) {
       res.send(result);
      });
     client.close();
  });
});
console.log("server started at 3000");
