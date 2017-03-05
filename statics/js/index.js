var headerExpandChange = function(){


	$( "#header" ).toggleClass("headerOpen");	
	$( "#header" ).toggleClass("headerClosed");	
	if($("#headerExpandButton").html() == "V Learn More V"){
		$("#headerExpandButton").text("> Learn More <")
	}
	else{
		$("#headerExpandButton").text("V Learn More V")

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



