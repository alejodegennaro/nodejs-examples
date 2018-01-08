var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://172.17.0.4:27017/menuprovider';

var dropCollection = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('menu');
  // Drop collecction
  collection.drop(function(err, res) {
    assert.equal(err, null);
    console.log("Dropeada!");
    console.log(res);
    callback(res);
  });
}

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  dropCollection(db, function() {    
    db.close();
  });
});
