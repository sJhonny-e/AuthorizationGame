(function(){
	window.clicksAuthorization = window.clicksAuthorization || {};

	var resultContainer = document.getElementById('result');
	window.clicksAuthorization.resultsDisplayer = {
		showResult: function(isSuccess) {
			resultContainer.textContent = isSuccess? 'Yay! you cracked it' : 'not yet...';
			resultContainer.className = 'v-align alert ' + (isSuccess ? 'alert-success' : 'alert-danger');
		}
	}
})();