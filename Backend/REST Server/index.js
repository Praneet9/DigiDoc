const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

//Set up express app

const app = express();

app.use(bodyParser.json());
//Initialize routes

app.use('/api', routes);
//app.use(routes);



//Error Handling Middleware
app.use(function(err, req, resp, next){
	console.log("ERROR DAMMNIT"+err);
	return resp.status(403).send({status: err.message});


});

// app.get('/api', function(req, resp) {
// 	console.log("Its a GET request");
// 	// resp.end();
// 	resp.send({'authentication': "failed"});
// });


//Listen for requests

app.listen(process.env.port || 8010, function(){
	console.log("Listening for requests");
});