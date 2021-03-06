var express = require('express');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var patients = require('./routes/patients');
var doctors = require('./routes/doctors');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/patients', patients);
app.use('/doctors', doctors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
app.listen(process.env.port || 12000, function(){
	console.log("Listening for requests");
});

module.exports = app;
