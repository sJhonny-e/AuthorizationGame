(function(){
	window.clicksAuthorization = window.clicksAuthorization || {};

	var apiBaseUrl = 'http://localhost:3000/api/';

	window.clicksAuthorization.clientRegistrator = {
		registerNewClient: function(callback) {
			// send client registration request to API
			var http = new XMLHttpRequest();
			var url = apiBaseUrl + "user/new";
			http.open("POST", url, true);

			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			http.onreadystatechange = function() {
			    if(http.readyState == 4 && http.status == 200) {
			        callback(JSON.parse(http.responseText));
			    }

			    // TODO: error handling
			}
			http.send();

		}
	}
})();