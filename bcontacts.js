/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-20 15:58:55
* @Last Modified by:   noor
* @Last Modified time: 2017-01-23 14:17:50
*/

var express 	= 	require("express"),
	app    		= 	express(),
	bodyParser 	= 	require('body-parser'),
	srvrConfig 	= 	require('./config/serverConfig'),
	dbConn 		= 	require('./dbConnection/connectTo'),
	routes    	= 	require("./routes/index")
	;

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());							//change bodyParser fn call to desired format



//first make db connection then start the server to listen
dbConn.makeConnection(function(){
	app.listen(3000,function(){
		console.log("Server listening on port 3000");
		app.use("/",routes);
	});
});

// app.use("/",routes); // Set default route to route folder
module.exports = app;

