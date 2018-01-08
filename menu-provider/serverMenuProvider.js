var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var async = require('async');
var express = require('express');
var port = process.env.PORT || '8090';
var url = 'mongodb://mongito:27017/menuprovider';
var app = express();
var router = express.Router();

var buscarMenuItemsPorRoles = function(db, userRolesParam, callback) {
  var query = [];
  if(userRolesParam!==undefined && userRolesParam!==''){
    var userRoles = userRolesParam.split(',');
    for(var i=0; i < userRoles.length; i++){
      query[i] = { roles : userRoles[i] };
    };
  }
  var collection = db.collection('menu');
  collection.find({$and: [{"parent": null},{$or: query}]}, {roles:0, children:0}).toArray(function(err, topItems) {
    assert.equal(err, null);
    async.map(topItems, function(item, callback) {
      collection.find({$and: [{"parent": item._id},{$or: query}]}, {roles:0, children:0}).toArray(function(err, subMenuItems) {
        if(subMenuItems.length>0){
          item.submenu = subMenuItems; 
        }       
        async.map(subMenuItems, function(sitem, callback) {
        collection.find({$and: [{"parent": sitem._id},{$or: query}]}, {roles:0, children:0}).toArray(function(err, subsubMenuItems) {
            if(subsubMenuItems.length>0){
              sitem.submenu = subsubMenuItems;
            }
            callback(null, subsubMenuItems);
          });
        }, function(err, result) {
            if(err){
              console.log(err);
            }
            callback(null, subMenuItems);
        });
      });
    }, function(err, result) {
        if(err){
          console.log(err);
        }
        callback(topItems);
    });
  });
}; 

router.get('/menu/:roles', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    buscarMenuItemsPorRoles(db, req.params.roles, function(dato) {
      var resultado = {
        menu : dato,
        sipUrl : "http://sipdesa.colonseguros.com.ar",
        sepUrl : "http://sepdesa.colonseguros.com.ar"

      };
      res.json(resultado);
      db.close();
    });
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, charset, x-auth-token, Authorization");
  next();
});
app.use('/api', router);
app.listen(port);
console.log('Servidor Menu Provider corriendo en el puerto:' + port);
