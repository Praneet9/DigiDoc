var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
	password : '2GjDA2AEcdoo',
	database : 'digidoc'
});

module.exports = connection;
