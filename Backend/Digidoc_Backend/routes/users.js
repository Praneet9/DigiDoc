var express = require('express');
var router = express.Router();
var jwt_token = require('jsonwebtoken');
var connection = require('../models/index');

router.post('/check/doctors', function(req,res) {

  var token = req.body.access_token;
	var email = req.body.email;

  connection.query("SELECT * FROM doctors WHERE email = ? AND accessToken = ?", [email, token], function(err, row) {
    if (err) {
      res.status(401).send({'success': false, 'message': 'User not logged in'})
    } else {
      res.status(200).send({'success': true, 'message': 'Authenticated'})
    }
  })

})

router.post('/check/patients', function(req,res) {

  var token = req.body.access_token;
	var email = req.body.email;

  connection.query("SELECT * FROM patients WHERE email = ? AND accessToken = ?", [email, token], function(err, row) {
    if (err) {
      res.status(401).send({'success': false, 'message': 'User not logged in'})
    } else {
      res.status(200).send({'success': true, 'message': 'Authenticated'})
    }
  })

})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
