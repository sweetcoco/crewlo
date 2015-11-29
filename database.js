var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
    if (err) {
        connection.whatsUp = 'Oh no :(';
        return;
    } else {
        connection.whatsUp = 'Oh yeah baby oh yeah!!';
    }
});

exports.connection = connection;
