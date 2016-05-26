# AuthorizationGame
a game where if you click correctly, you're logged in :)

##About
Just a small game where you click different spots on the screen, and the server tells you whether you've succeeded in entering the correct combination or not

##Install
prerequisites: node and npm  
run `npm install`

##Server tests
run `npm test`

##Run
run the server with `npm start`  
run the client by just browsing to `client\index.html`

##Program structure
###Server
Just a regular express server, with two methods - one for registering a new client, and one for a client to submit a new click.  

When a click is submitted, a client service associates it with the correct client, and sends it to the security service, which checks whether this last click has cracked the code.

###Client
A plain-HTML, CSS and javascript page.  
CSS is done with bootstrap.  

the `app` controller uses a `clientRegistrator` to register the client on startup, and then registers the `clicksChecker` which monitors user's clicks and sends them to the server.  

The result from the server is then passed to a `resultDisplayer` which shows the user whether they've succeeded or not.

###Notes
* Client using ES5 to support all browsers.
* Therefore, client's code structure isn't great (using a global object to communicate between modules).
* If we want to scale this, we might consider using more sophisticated client-side tools like-
  * **karma + mocha / jasmine** for testing client-side code
  * **babel** for transpiling ES6 code to ES5
  * **module bundler and task runner** such as webpack / gulp to tie it all together
  
