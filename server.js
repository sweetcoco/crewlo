var Hapi = require('hapi');

var port = process.env.PORT || 3000;

var mysql = require('mysql'),
    sup;

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
    if (err) {
        sup = "oh no :(";
    } else {
        sup = "oh yeah!";
    }
});

var server = new Hapi.Server();
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!' + '<BR><BR>' + sup);
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
