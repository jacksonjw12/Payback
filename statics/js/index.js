

var populateItems = function(){
	get('/testReadDB',{},function(data){
		console.log(data.objs)
		for(var i = 0; i < data.objs.length; i++){
			var temp = "Article Title";
			if(data.objs[i].article.type == "plainText"){
				var newEntry = '<div class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + data.objs[i].article.name + '</h3><p>' + data.objs[i].article.plainText + '</p></div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="' + data.objs[i].charity.link + '" class="btn btn-default" role="button">Donate Here</a></div></div>';

			}
			else if(data.objs[i].article.type == "twitter"){
				var newEntry = '<div class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + data.objs[i].article.name + '</h3><blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="' + data.objs[i].article.plainText + '"></a></blockquote></div><div class="col-md-4 donation text-center"><h4>' + data.objs[i].charity.name + '</h4><img src="' + data.objs[i].charity.picture + '"><a href="' + data.objs[i].charity.link + '" class="btn btn-default" role="button">Donate Here</a></div></div>';

			}


			$('#content').append(newEntry);

		}

	});

}






populateItems();




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



