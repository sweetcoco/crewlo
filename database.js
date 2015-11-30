var mysql = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME || config.awsMysql.HOSTNAME,
  user     : process.env.RDS_USERNAME || config.awsMysql.USERNAME,
  password : process.env.RDS_PASSWORD || config.awsMysql.PASSWORD,
  port     : process.env.RDS_PORT || config.awsMysql.RDS_PORT
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
