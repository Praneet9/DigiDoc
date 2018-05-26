const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

//Set up express app

const app = express();

var fs = require('fs'),
https = require('https');



app.use(bodyParser.json());
//Initialize routes

// app.use('/api', routes);
app.use(routes);



// app.get('/api', function(req, resp) {
// 	console.log("Its a GET request");
// 	// resp.end();
// 	resp.send({'authentication': "failed"});
// });


//Listen for requests


https.createServer({       
key: fs.readFileSync('./dev.digiklug_privateKey.key'),       
cert: fs.readFileSync('./dev_digiklug_com.crt'),
requestCert: true,                   
     
rejectUnauthorized: false
//ca: fs.readFileSync('./dev_digiklug_com.ca-bundle', 'ascii')     
}, app).listen(process.env.port || 8010, function(){
	console.log("Listening for requests");
});





//app.listen(process.env.port || 8010, function(){
//	console.log("Listening for requests");
//});
