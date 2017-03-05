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
        "link" : "http://festivusweb.com/festivus-the-human-fund.htm"
      },
      "clicks" : 10,
      "upvotes" : 1
}

var newEntry_json = {
      "article" : {
         "type" : "plainText",
         "name" : "eyyy",
         "twitterID" : "0",
         "plainText" : "This is some filler text concerning a donation page.",
         "link" : "http://www.google.com/"
      },
      "charity" : {
        "name" : "The Human Fund",
        "link" : "http://festivusweb.com/festivus-the-human-fund.htm",
        "picture" : "http://i.imgur.com/XdkPivg.jpg"
      },
      "clicks" : 10,
      "upvotes" : 1
}

// var newEntry_html = '<div id="new" class="col-sm-12 entry"><div class="col-md-8 source"><h3>NEW ENTRY</h3><p></p></div><div class="col-md-4 donation text-center"><h4></h4><img><a href="#" class="btn btn-default" role="button">Donate Here</a></div></div>';


// var addDiv = function(obj) {

// }





var addDiv = function(newObj) {
	// $('#content').append(newEntry_html);
	// $('#new h3').text('ITS YA BOI');
	// $('#new p').text('LOREM IPSUM MOTHERFUCKER');
	// $('#new h4').text('Company naeemmm');
	// $('#new img').attr('src', 'css/media/eggplant.png');
	// $("#new a").attr('href', 'http://www.apple.com/');

	
	var newEntry_html = '<div id="new" class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + newObj.charity.name + '</h3><p>' + newObj.article.plainText + '</p></div><div class="col-md-4 donation text-center"><h4>' + newObj.charity.name + '</h4><img src="' + newObj.charity.picture + '"><a href="' + newObj.charity.name + '" class="btn btn-default" role="button">Donate Here</a></div></div>';
	// var newEntry_html = '<div id-"new" class="col-sm-12 entry"><div class="col-md-8 source"><h3>' + newObj.article.plainText + '</h3><p></p></div><div class="col-md-4 donation text-center"><h4></h4><img><button type="button" class="btn btn-default">Donate Here</button></div></div>';
	$('#content').append(newEntry_html);
}

addDiv(newEntry_json);

