//server.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var config = require ('./config/config.json')
var db = mongoose.connect(config.dbHost);
var routes = require('./api/resources/index.js');
var cors = require ('cors');
const DEFAULT_PORT = 3001;
const HTML_INDEX = path.join(__dirname, 'public/index.html');
const DIST_DIR = path.join(__dirname,'dist');
const app = express();

app.use(cors());

app.use(function(req,res,next){
	req.db = db;
	next();
});

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(`path-dist: ${DIST_DIR}`);
app.use('/dist',express.static(DIST_DIR));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


app.use('/', routes);

app.get('/*', function(req, res, next){
	res.sendFile(HTML_INDEX);
});

app.listen(DEFAULT_PORT, function(error){
	console.log(`SERVER ESCUCHANDO EN PUERTO ${DEFAULT_PORT}`);
	if(error){
		console.log(error);
	}
});


