'use strict'
const ClientsService = require('./services/clientsService.js');
const SecurityService = require('./services/SecurityService');


// TODO: proper DI, if we want to
const securityService = new SecurityService();
const clientsService = new ClientsService(securityService);

const express = require('express');
const bodyParser = require('body-parser')

let app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// allow CORS
app
.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.post('/api/user/new', (req, res) => {
	const id = clientsService.registerClient();
	res.json({id});
});


app.post('/api/user/:clientId/click', (req, res) => {
	const coordinate = {x: req.body.x, y: req.body.y };
	if (!coordinate.x || !coordinate.y)
		return res.status(400).json({error: 'given coordinate is not legal; must contain both X and Y'})
	const clientId = Number.parseInt(req.params.clientId);
	if (Number.isNaN(clientId))
		return res.status(400).json({error: 'illegal client id'});

  	let result = clientsService.addClick(clientId, coordinate);
  	if (typeof result === 'string')	// string indicates an error
  		return res.status(400).json({error: result});
  	
  	res.json({success: result});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});