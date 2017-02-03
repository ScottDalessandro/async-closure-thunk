function mockAjax(url, callBack) {
	
  var mockResponses = {
		"url-1": "The first request response",
		"url-2": "The second request response",
		"url-3": "The third request response"
	};
	var randomizedDelay = (Math.round(Math.random() * 1E5) % 9000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		callBack(mockResponses[url]);
	}, randomDelay);
}

// utility fuction for logging
function output(text) {
	console.log(text);
}

// Students wouldn't get this code.
function fetchUrl(url) {
	var response;
	mockAjax(url, function(text){
		if(!response) response = text;
		else response(text);
	});
	return function th(cb){		
		if(response) cb(response);
		else response = cb;
	};
}

// Get each file in parallel
// students wouldn't get this code:

var thunk1 = fetchUrl('url-1');
var thunk2 = fetchUrl('url-2');
var thunk3 = fetchUrl('url-3');

thunk1(function(text){
  output(text);
  thunk2(function(text){
    output(text);
    thunk3(function(text){
      output(text);
      output('Completed');
    });
  });
});