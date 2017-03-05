var data = [];
var sortStyle = 'hot';

var populateItemsFirst = function(){
	get('/testReadDB',{},function(dataImport){
		data = dataImport;
		
		sortData();
		/*for(var i = 0; i < data.objs.length; i++){
			var temp = "Article Title";
			if(data.objs[i].article.type == "plaintext"){
				var newEntry = '<div id="div' + (i+1) +'" class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + data.objs[i].article.name + '</h3><p>' + data.objs[i].article.plainText + '</p></div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="javascript:linkClick(' +"'" +data.objs[i].charity.link +"','" + data.objs[i]._id+"'"+ ')" class="btn btn-default" role="button">Donate Here</a></div></div>';
				$('#content').append(newEntry);
			}
			else if(data.objs[i].article.type == "twitter"){
				//newEntry = '<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="' + data.objs[i].article.twitterID + '"></a></blockquote>'
				//get('https://api.twitter.com/1.1/statuses/oembed.json?id=262584296081068033',{}, function(data){console.log(data)})
				var newEntryA = '<div id="div' + (i+1) +'" class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + data.objs[i].article.name + '</h3> ';
				var newEntryB = '</div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="javascript:linkClick(' +"'" +data.objs[i].charity.link +"," + data.objs[i].id_+"'"+ ')" class="btn btn-default" role="button">Donate Here</a></div></div>';
				
				//console.log(data);
				// $('#content').append(data.html);

				var newEntry = newEntryA + "<div id='"+i+data.objs[i].article.twitterID+"'></div>" + newEntryB;

				$('#content').append(newEntry);

				twttr.widgets.createTweet(
					data.objs[i].article.twitterID,
					document.getElementById( i+data.objs[i].article.twitterID),
					{}  
				);
			}	
		}*/


	});
}

var populateItems = function(){
	refreshContent();
	console.log(data)
	for(var i = 0; i < data.objs.length; i++){
		var temp = "Article Title";
		if(data.objs[i].article.type == "plaintext"){
			var newEntry = '<div id="div' + (i+1) +'" class="col-sm-12 entry"><div class="col-md-8 source "><h3>' + data.objs[i].article.name + '</h3></br><h4 class="inner">' + data.objs[i].article.plainText + '</h4></div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="javascript:linkClick(' +"'" +data.objs[i].charity.link +"','" + data.objs[i]._id+"'"+ ')" class="btn btn-default" role="button">Donate Here</a></div></div>';
			$('#content').append(newEntry);
		}
		else if(data.objs[i].article.type == "twitter"){
			//newEntry = '<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="' + data.objs[i].article.twitterID + '"></a></blockquote>'
			//get('https://api.twitter.com/1.1/statuses/oembed.json?id=262584296081068033',{}, function(data){console.log(data)})
			var newEntryA = '<div id="div' + (i+1) +'" class="col-sm-12 entry"><div class="col-md-8 source "><h3>' + data.objs[i].article.name + '</h3> </br>';
			var newEntryB = '</div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="javascript:linkClick(' +"'" +data.objs[i].charity.link +"," + data.objs[i].id_+"'"+ ')" class="btn btn-default" role="button">Donate Here</a></div></div>';
			
			//console.log(data);
			// $('#content').append(data.html);

			var newEntry = newEntryA + "<div id='"+i+data.objs[i].article.twitterID+"'></div>" + newEntryB;

			$('#content').append(newEntry);

			twttr.widgets.createTweet(
				data.objs[i].article.twitterID,
				document.getElementById( i+data.objs[i].article.twitterID),
				{}  
			);
		}	
		else if(data.objs[i].article.type == "article"){
			var newEntry = '<div id="div' + (i+1) +'" class="col-sm-12 entry"><div class="col-md-8 source "><h3>' + data.objs[i].article.name + '</h3></br><h4 class="inner">' + data.objs[i].article.plainText + '</h4>' + '<a href="' + data.objs[i].article.link + '"<h3> Go to Article </h3><a>'+'</div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="javascript:linkClick(' +"'" +data.objs[i].charity.link +"','" + data.objs[i]._id+"'"+ ')" class="btn btn-default" role="button">Donate Here</a></div> </div>';
			// newEntry+= 

			$('#content').append(newEntry);
		}

	}
}

function linkClick(url,id){
	console.log(url);
	console.log("clicked");
	post('/newClick',{"id":id}, function(data){
		console.log("clicked");
		window.location = url;
	});
}

var setSortStyle = function(a){
	sortStyle = a;
	sortData();
}

var sortData = function(){
	if(sortStyle == 'newest'){
		data.objs.sort(function(a,b){
			return Date.parse(b.date) - Date.parse(a.date);
		});
	}else if(sortStyle == 'oldest'){
		data.objs.sort(function(a,b){
			return Date.parse(a.date) - Date.parse(b.date);
		});
	}else if(sortStyle == 'hot'){
		data.objs.sort(function(a,b){
			return b.clicks - a.clicks;
		});
	}
	populateItems();
	return data;
}

var refreshContent = function(data){
	$('#content').empty();
}

// populateItems();

function get(domain, obj, callback) {
	$.ajax({
		url: domain,
		type: "GET",
		data: JSON.stringify(obj),
		cache: false,
		dataType: "json",
		contentType: "application/json"
	}).done(function (data) {
		callback(data);
	}).fail(function () {
		console.error("Error reading file at '" + domain + "'.");
	});
}


function post(domain, obj, callback) {
	$.ajax({
		url: domain,
		type: "POST",
		data: JSON.stringify(obj),
		cache: false,
		dataType: "json",
		contentType: "application/json"
	}).done(function (data) {
		callback(data);
	}).fail(function () {
		console.error("Error reading file at '" + domain + "'.");
	});
}


var headerExpandChange = function(){
	$( "#header" ).toggleClass("headerOpen");	
	$( "#header" ).toggleClass("headerClosed");	
	if($("#headerExpandButton").html() == "Close"){
		$("#headerExpandButton").text("Learn More >")
	}
	else{
		$("#headerExpandButton").text("Close")
	}
	$( "#invisible_header" ).toggleClass("headerOpen");	
	$( "#invisible_header" ).toggleClass("headerClosed");
}

$(document).on("scroll", function(){
	if($(document).scrollTop() > 100){
		if($('#header').hasClass('headerOpen')){
			$("#header" ).toggleClass("headerOpen");	
			$( "#invisible_header" ).toggleClass("headerOpen");	
			$("#headerExpandButton").text("Learn More >")
		}
		if(!$('#header').hasClass('headerMinimized')){
			$("#header" ).toggleClass("headerMinimized");	
			$( "#invisible_header" ).toggleClass("headerMinimized");
		}
	}
	else if($(document).scrollTop() == 0){
		if($('#header').hasClass('headerMinimized')){
			$( "#invisible_header" ).toggleClass("headerMinimized");	
			$("#header" ).toggleClass("headerMinimized");	
		}
		if(!$('#header').hasClass('headerClosed')){
			$( "#invisible_header" ).toggleClass("headerClosed");	
			$( "#header" ).toggleClass("headerClosed");
		}
	}
});