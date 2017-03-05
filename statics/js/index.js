

var populateItems = function(){
	get('/testReadDB',{},function(data){
		console.log(data.objs)
		for(var i = 0; i < data.objs.length; i++){
			var newEntry = '<div class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + data.objs[i].article.plainText + '</h3><p></p></div><div class="col-md-4 donation text-center"><h4></h4><img><button type="button" class="btn btn-default">Donate Here</button></div></div>';


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



