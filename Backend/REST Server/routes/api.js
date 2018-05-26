const express = require('express');

const router = express.Router();	

const connection = require('../models/login');

var Sync = require('sync');

//Performing the requests

function hasNull(target) {
    for (var member in target) {
        if (target[member] == null || target[member] == "" || target[member] == undefined)
            return true;
    }
    return false;
}

//Get data
router.get('/', function(req, resp, next){
	// connection.connect();

	resp.send({'request': 'GET',
		'status': "API Up and Running!"});

});
	// connection.end();
	// resp.send({'request': 'GET',
	// 			'username': username}); 


//Register
router.post('/', function(req, resp, next){
	// console.log(req.body);
	if (hasNull(req.body)) throw new Error('Missing Parameters');
	
		//Checking if the user is already registered
	connection.query('select l_email from login where l_email="'+req.body.email+'" and l_role="'+req.body.role+'";'  , function (err, rows, fields) {

		if (err) throw err
		console.log("This is rows man"+rows);
		if (Object.keys(rows).length != 0 /*IF ROWS FOUND*/ && rows[0].l_email == req.body.email /*CHECKING IF ALREADY REGISTERED*/){
			console.log("IF true hua lemail == bodymail");
			// throw new Error('ALREADY REGISTERED');
			return resp.status(400).send({request: 'POST',
			 status:'ALREADY REGISTERED'});
			resp.end();
		}
		else{
///////////////////////////////////////////
//registering the user
	connection.query('insert into login values ("'+req.body.email+'","'+req.body.password+'","'+req.body.role+'");'  , function (err, rows, fields) {
		if (err) throw err
		console.log('Login Table Updated');
		console.log(rows);
		console.log("First connection established to register");
		})

	if(req.body.role=="Patient"){
		connection.query('insert into patient values (NULL,"'+req.body.firstname+'","'+req.body.lastname+'","'+req.body.dob+'","'+req.body.phone+'","'+req.body.gender+'","'+req.body.email+'");'  , function (err, rows, fields) {
			if (err) throw err
			console.log('Details Added');
			console.log(rows);
			console.log("Second connection established to register");
	
	})
	}
	else if (req.body.role == "Doctor"){
		connection.query('insert into doctor values (NULL,"'+req.body.firstname+'","'+req.body.lastname+'","'+req.body.qualification+'","'+req.body.specialities+'","'+req.body.rating+'","'+req.body.phone+'","'+req.body.email+'","'+req.body.dob+'");'  , function (err, rows, fields) {
			if (err) throw err
			console.log('Details Added');
			console.log(rows);



	})
	}


////////////////////////////////////////////
		}
		console.log(rows);
		resp.status(201).send({'request': 'POST',
				'status': 'Registered'})
		resp.end();		


		})
	
	



});


//Login
router.post('/auth', function(req, resp, next){
	console.log(req.body);
	if (hasNull(req.body)) throw new Error('Missing Parameters');
	connection.query('select l_password from login where l_email="'+req.body.email+'" and l_role="'+req.body.role+'";', function (err, rows, fields) {
		if (err) throw err
		console.log(rows);

		if (Object.keys(rows).length != 0 && rows[0].l_password == req.body.password) {
			resp.status(200).send({'request': 'POST',
						'status': 'ACCESS GRANTED'});

		}

		else{
			resp.status(401).send({'request': 'POST',
						'status': 'ACCESS DENIED'});
		}
	})

	
	
});


//Modify existing data
router.put('/', function(req, resp, next){
	if (req.body.role == "" || req.body.role == null || req.body.role == undefined) throw new Error('Missing Parameters');
	if (req.body.email == "" || req.body.email == null || req.body.email == undefined) throw new Error('Missing Parameters');




	connection.query('select * from login where l_email="'+req.body.email+'";', function (err, rows, fields) {
		if (err) throw err
		console.log(rows);
		if (Object.keys(rows).length == 1){
			if (req.body.role == "Patient"){
				var updatePatient = {
					role: null,
					firstName: null,
					lastName: null,
					dob: null,
					phone: null,
					gender: null,
					email: null,

				};

				if (req.body.firstname != "" || req.body.firstname != null || req.body.firstname != undefined) 
					updatePatient.firstName = req.body.firstname;
				else
					updatePatient.firstName = rows[0].p_fname;
				if (req.body.lastname != "" || req.body.lastname != null || req.body.lastname != undefined) 
					updatePatient.lastName = req.body.lastname;
				else
					updatePatient.lastName = rows[0].p_lname;
				if (req.body.phone != "" || req.body.phone != null || req.body.phone != undefined) 
					updatePatient.phone = req.body.phone;
				else
					updatePatient.phone = rows[0].p_phone;
				
				connection.query('UPDATE patient SET p_fname="'+updatePatient.firstName+'", p_lname="'+updatePatient.lastName+'", p_phone="'+updatePatient.phone+'" where p_email="'+req.body.email+'";', function (err, rows, fields) {
					if (err) throw err
					console.log("Patient Details Updated");

				})


			}
			else if (req.body.role == "Doctor"){
				var updateDoctor = {
					role:null,
					firstName:null,
					lastName:null,
					qualification:null,
					specialities:null,
					rating:null,
					phone:null,
					email:null,
					dob:null,
					

				};
				if (req.body.firstname != "" || req.body.firstname != null || req.body.firstname != undefined) 
					updateDoctor.firstName = req.body.firstname;
				else
					updateDoctor.firstName = rows[0].d_fname;
				if (req.body.lastname != "" || req.body.lastname != null || req.body.lastname != undefined) 
					updateDoctor.lastName = req.body.lastname;
				else
					updateDoctor.lastName = rows[0].d_lname;
				if (req.body.phone != "" || req.body.phone != null || req.body.phone != undefined) 
					updateDoctor.phone = req.body.phone;
				else
					updateDoctor.phone = rows[0].d_phone;
				if (req.body.qualification != "" || req.body.qualification != null || req.body.qualification != undefined) 
					updateDoctor.qualification = req.body.qualification;
				else
					updateDoctor.qualification = rows[0].d_qualification;
				if (req.body.specialities != "" || req.body.specialities != null || req.body.specialities != undefined) 
					updateDoctor.specialities = req.body.specialities;
				else
					updateDoctor.specialities = rows[0].d_specialities;

				connection.query('UPDATE doctor SET d_fname="'+updateDoctor.firstName+'", d_lname="'+updateDoctor.lastName+'", d_phone="'+updateDoctor.phone+'", d_qualification="'+updateDoctor.qualification+'", d_specialities="'+updateDoctor.specialities+'" where d_email="'+req.body.email+'";', function (err, rows, fields) {
					if (err) throw err
					console.log("Doctor Details Updated");

				})
			}

			   		
			connection.query('UPDATE login SET l_password="'+req.body.password+'" where l_email="'+req.body.email+'";', function (err, rows, fields) {
				if (err) throw err
				console.log(rows);

			})
			resp.status(200).send({'request': 'PUT',
						'status': 'DETAILS UPDATED'});
		
			}
		
		else {
			resp.status(401).send({'request': 'PUT',
						'status': 'EMAIL NOT FOUND'});	
		}
		

	
	})	

	
	
	


});

//delete a data
router.delete('/', function(req, resp, next){
	if (hasNull(req.body)) throw new Error('Missing Parameters');

	connection.query('select l_role from login WHERE l_email="'+req.body.email+'" and l_password="'+req.body.password+'";', function (err, rows, fields) {
		if (err) throw err
		console.log(rows);

		if (Object.keys(rows).length != 1){
			resp.status(401).send({'request': 'DELETE',
						'status': 'EMAIL NOT FOUND'});
		}
		else{
			var email_type;
			var password_type;
			var role_type;
			
			
			if(req.body.role=="Doctor"){
				email_type = "d_email";
				role_type = "doctor";

			}
			else if(req.body.role == "Patient"){
				email_type = "p_email";
				role_type = "patient";
			}
			connection.query('DELETE FROM login WHERE l_email="'+req.body.email+'" and l_role="'+req.body.role+'";', function (err, rows, fields) {
				if (err) throw err

			})

			
			connection.query('DELETE FROM '+req.body.role+' where '+email_type+'="'+req.body.email+'";', function (err, rows, fields) {
				if (err) throw err

			})

			resp.send({'request': 'DELETE',
						'status': 'Success'});
		}

	})
	
});	



module.exports = router;