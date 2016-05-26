(function() {
	// first - register this client
	window.clicksAuthorization.clientRegistrator.registerNewClient(function(registrationResult) {
		var clientId = registrationResult.id;
		// then - register a click handler to be called whenever a click occurs, and returns whether this click cracked the code.
		window.clicksAuthorization.clicksChecker.registerClicksHandler(clientId, function(authenticationResult) {
			window.clicksAuthorization.resultsDisplayer.showResult(authenticationResult.success);
		});
	});
})();