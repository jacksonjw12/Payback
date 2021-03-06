var http = require("http");
var url = require("url");
var request = require("request");
ObjectId = require('mongodb').ObjectID;


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://payback:casa@jacksonwheelers.space/payback?authSource=admin';
var n = 0;
function start() {

	var express = require('express');
	app = express();
	var bodyParser = require('body-parser')
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 

	app.use(express.static(__dirname + '/statics'));

	app.get('/', function (req, res) {
		res.sendFile(__dirname + '/statics/index.html')
	});
	app.get('/getData',function(req,res){
		console.log(req.param('id'))
		res.send({"hello":"world"})

	})
	app.get('/getDisplay',function(req,res){
		if(req.param('id') != undefined){
			MongoClient.connect(url, function(err, db) {	
		 
			
			  	findPayback(db, function(objs) {
			  		
			  		var mID = objs[req.param('id')-1]._id;
					db.collection('payback').update(
						{"_id":mID},
						{
							$inc: { "clicks": 1 }
						}, function(err, results) {
						console.log(results);
					});
			  		//res.send("ANAND::0 " + objs[n].article.name +  "  " +objs[n].clicks+ "%:1" + objs[n+1].article.name +  "  " +objs[n+1].clicks+ "%:2" + objs[n+2].article.name +  "  " +objs[n+2].clicks+ "%:3" + objs[n+3].article.name +  "  " +objs[n+3].clicks+ "%")
			  		


			      	db.close();
			 	});
			});  
			
		}
		
			MongoClient.connect(url, function(err, db) {	
		 
			
			  	findPayback(db, function(objs) {
			  		

			  		res.send("ANAND::0 " + objs[n+8].article.name +  "  " +objs[n+8].clicks+ "%:1" + objs[n+6].article.name +  "  " +objs[n+6].clicks+ "%:2" + objs[n+2].article.name +  "  " +objs[n+2].clicks+ "%:3" + objs[n+3].article.name +  "  " +objs[n+3].clicks+ "%")
			  		


			      	db.close();
			 	});
			});  
		
		
		
		

		// if(n >= 4){n = 0;}
		
		// if(n == 0){
		// 	res.send("ANAND::0 Hello %")
		// }
		// else if(n==1){
		// 	res.send("ANAND::1 Is it me your looking for %")
		// }
		// else if(n==2){
		// 	res.send("ANAND::2 I can see it in your eyes%")
		// }
		// else if(n==3){
		// 	res.send("ANAND::3 Ryan is the literal representation of a cunt%")		
		// }
		// n++;

	})
	app.get('/testReadDB',function(req,res){
		MongoClient.connect(url, function(err, db) {	
		 
			
		  	findPayback(db, function(objs) {
		  		res.send({"objs":objs})
		      	db.close();
		 	});
		});  
	})	

	app.get('/addArticles',function(req,res){
		res.sendFile(__dirname + '/statics/addArticle.html')
		
	});

	app.post('/newClick',function(req,res){
		MongoClient.connect(url, function(err, db) {	
		 	console.log(req.body.id)
		 	var mID = ObjectId(req.body.id);
			db.collection('payback').update(
				{"_id":mID},
				{
					$inc: { "clicks": 1 }
				}, function(err, results) {
				console.log(results);
			});

		});  
		res.send({})
	})

	app.post('/newUpvote',function(req,res){
		console.log(req.body.data);

		MongoClient.connect(url, function(err, db) {	
		 
			
		  	db.collection('payback').updateOne(
				{ _id : req.body.id },
				{
					$inc: { upvotes: 1 }
				}, function(err, results) {
				//console.log(results);
			});

		});  
		res.send({})
	})




	app.post('/addDocument',function(req,res){
		console.log(req.body.data);
		MongoClient.connect(url, function(err, db) {	
		 
			
		  	insertDocument(db,req.body.data, function() {
		      db.close();
		  	});

		});  
		res.send({})
	});

	app.get('/tempFixDates',function(req,res){
		MongoClient.connect(url, function(err, db) {	
		 	// db.payback.update({}, {$set: {"date": new Date()}}, false, true)
			
			var cursor =db.collection('payback').find( );
			

			cursor.each(function(err, doc) {
				assert.equal(err, null);
				if (doc != null) {
					for(var i = 0; i< 100; i++){
						console.log(i);
					}
					doc.date = new Date();
					db.collection('payback').save(doc)
					

					//console.log(doc);
				} else {
					console.log("doc is done")
	     		 }

	  		});

		});  
		res.send({})
			
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

	
	var port = 8889;
	

	var server = app.listen(port);

	console.log("Server has started on port " + port);
}

exports.start = start;



var insertDocument = function(db,data, callback) {
   db.collection('payback').insertOne( {
      "article" : {
         "type" : data.article.type,//could also be twitter, or article or plainText
          "name" : data.article.name,
         "twitterID" : data.article.twitterID,
         "plainText" : data.article.plainText,
         "link" : data.article.link
      },
      "charity" : {
        "name" : data.charity.name,
        "link" : data.charity.link,
        "picture":data.charity.picture
      },
      "clicks" : data.clicks,
      "upvotes" : data.upvotes,
      "date" : data.date
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the payback collection.");
    callback();
  });
};

var findPayback = function(db, callback) {
   var cursor =db.collection('payback').find( );
   var objs = [];

   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
      	objs.push(doc)
         //console.log(doc);
      } else {
         console.log("doc is done")
         callback(objs)
      }

   });
   
};
var testDocument =  {
      "article" : {
         "type" : "plainText",
         "name" : "eyyy",
         "twitterID" :"0",
         "plainText" : "test",
         "link" : "http://www.jacksonwheelers.space"
      },
      "charity" : {
        "name" : "the human fund",
        "link" : "http://festivusweb.com/festivus-the-human-fund.htm",
        "picture":"http://i.imgur.com/XdkPivg.jpg"

      },
      "clicks" : 10,
      "upvotes" : 1,
      "date" : new Date()
}
MongoClient.connect(url, function(err, db) {	
  assert.equal(null, err);
	db.createCollection("payback", function(err, collection){
	   if (err) throw err;

	   	console.log("Created testCollection");
	 		console.log(collection);
	});


	/*insertDocument(db,testDocument, function() {
      db.close();
  	});*/
  	findPayback(db, function(objs) {
      db.close();
  });
});  

var updateUpvotes = function(db, callback) {
   db.collection('payback').updateOne(
      { "name" : "test" },
      {
        $inc: { 'upvotes': 1 }
      }, function(err, results) {
      console.log(results);
      callback();
   });
};

var updateClicks = function(db, callback) {
   db.collection('payback').updateOne(
      { "name" : "test" },
      {
        $inc: { 'clicks': 1 }
      }, function(err, results) {
      console.log(results);
      callback();
   });
};

var removePayback = function(db, callback) {
   db.collection('payback').deleteMany(
      { "name": "test" },
      function(err, results) {
         //console.log(results);
         callback();
      }
   );
};


var sortUpvotes = function(db, callback) {
   var cursor =db.collection('payback').find().sort( { "upvotes": -1, "name": 1 } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

var sortClicks = function(db, callback) {
   var cursor =db.collection('payback').find().sort( { "clicks": -1, "name": 1 } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};