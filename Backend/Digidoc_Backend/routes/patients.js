var express = require('express');
var router = express.Router();
var jwt_token = require('jsonwebtoken');
var connection = require('../models/index');

router.post('/register', function(req,res) {

  var email = req.body.email;
  var password = req.body.password;

	var payload = {
		email : email,
		password : password
	}
	var token = jwt_token.sign(payload, password)

  connection.query("INSERT INTO patients(email, password, accessToken) VALUES (?, ?, ?)", [email, password, token], function(err, row) {
    if (err) {
      res.status(400).send({'success': false, 'message': 'Something went wrong!', 'error': err})
    } else {
      res.status(201).send({'success': true, 'message': 'Successfully Registered!', 'token': token})
    }
  })

})

router.post('/login', function(req,res) {

  var email = req.body.email;
  var password = req.body.password;

	// var payload = {
	// 	email : email,
	// 	password : password
	// }
	// var token = jwt_token.sign(payload, password)
	//console.log(token);
  connection.query("SELECT * FROM patients WHERE email = ? AND password = ?;", [email, password], function(err, row, fields) {
    if (err) {
      res.status(500).send({'success': false, 'message': 'Something went wrong!'})
    } else {
			if (row.length > 0) {
				res.status(202).send({'success': true, 'message': 'Login Successful', 'token': row[0]['accessToken']})
			} else {
				res.status(404).send({'success': false, 'message': 'No such user!'})
			}
    }
  })
})

router.post('/details',function(req, res) {

  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var history = req.body.history;
  var current_status = req.body.current_status;

	connection.query("UPDATE patients SET first_name = ?, last_name = ?, gender = ?, dob = ?, history = ?, current_status = ? WHERE email = ?;",
										[first_name, last_name, gender, dob, history, current_status, email], function(err, row) {
											if (err) {
												res.status(500).send({'success': false, 'message': 'Updating profile failed!'})
											} else {
												res.status(201).send({'success': true, 'message': 'Profile details updated!'})
											}
										})
})

router.post('/profile',function(req, res) {

  var email = req.body.email;

	connection.query("SELECT email,first_name,last_name,dob,gender,history,current_status FROM patients WHERE email = ?", [email], function(err, row) {
											if (err) {
												res.status(400).send({'success': false, 'message': 'Bad Request'})
											} else {
												res.status(200).send({'success': true, 'user': row[0]})
											}
										})

})

router.get('/', function(req, res, next) {
  res.send('Patients API Running');
});

module.exports = router;