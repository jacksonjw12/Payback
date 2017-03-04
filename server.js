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
	app.get('/getData',function(req,res){

		res.send({"hello":"world"})

	})
	app.get('/getDisplay',function(req,res){
		var n = Math.floor(2*Math.random());
		if(n == 0){
			res.send({"value":false})
		}
		else{
			res.send({"value":true})	
		}

	})

	/*app.get('/aboutMe', function (req, res) {
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


		
	})*/

	
	var port = 8888;
	

	var server = app.listen(port);

	console.log("Server has started on port " + port);
}

exports.start = start;

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
	
var url = 'mongodb://jacksonwheelers.space';
	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
  	console.log("Connected correctly to server.");
  	db.close();
});
