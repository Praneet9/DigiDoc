var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '2GjDA2AEcdoo',
  database : 'DMA'
});

// connection.connect()

// // connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
// connection.query('select * from doctors', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].username);
// })

// connection.end()


module.exports = connection; 
