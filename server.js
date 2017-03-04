var http = require("http");
var url = require("url");
var request = require("request");
function start() {

	var express = require('express');
	app = express();
	var bodyParser = require('body-parser')
	var mongodb
	

	app.use(express.static(__dirname + '/statics'));

	app.get('/', function (req, res) {
		res.sendFile(__dirname + '/statics/index.html')
	});
	app.get('/aboutMe', function (req, res) {
		res.sendFile(__dirname + '/statics/aboutMe.html')
	});

	app.get('/resume', function(req,res) {
		request('http://docs.google.com/document/d/1UfJi7kSP_alS7ct90PUQOBx-cXET3iEQP7ekGsALA8Q/export?format=html', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    string = body; // Show the HTML for the Google homepage. 
		    console.log(body)
		    res.send(body)
		  }
		  else {
		    console.log("Error "+response.statusCode)
		    string = "error"
		    res.send("Whoops there was an error. Download my resume here <a href='http://docs.google.com/document/d/1UfJi7kSP_alS7ct90PUQOBx-cXET3iEQP7ekGsALA8Q/export?format=html'>here</a>")
		  }
		})


		
	})
	
	var port = 8888;
	

	var server = app.listen(port);
	
	
	
	console.log("Server has started on port " + port);
}

var MongoClient = require('mongodb').MongoClient, format = require('util').format;

MongoClient.connect('mongodb://localhost:8888',fuction(err, db) {
    if(err) throw err;

    var collection = db.collection('payback');
});

exports.start = start;
