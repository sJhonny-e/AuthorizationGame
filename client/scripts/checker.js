(function(){
	window.clicksAuthorization = window.clicksAuthorization || {};

	var apiBaseUrl = 'http://localhost:3000/api/';

	
	window.clicksAuthorization.clicksChecker = {
		registerClicksHandler: function(clientId, callback) {
			var self = this;
			self.clientId = clientId;

			var clickArea = document.getElementById('click-area');
			clickArea.onclick = submitClick;


			function submitClick(ev) {
				var coordinates = {
					x: ev.clientX,
					y: ev.clientY
				};

				// send click to API
				var http = new XMLHttpRequest();
				var url = apiBaseUrl + "user/" + self.clientId + '/click';
				var params = 'x=' + coordinates.x + '&y=' + coordinates.y;
				http.open("POST", url, true);

				//Send the proper header information along with the request
				http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				http.onreadystatechange = function() {
				    if(http.readyState == 4 && http.status == 200) {
				        callback(JSON.parse(http.responseText));
				    }
				    // TODO: error handling
				}
				http.send(params);
			}
		}
	}


})();