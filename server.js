var Hapi = require('hapi');
var connection = require('./database').connection;

var port = process.env.PORT || 3000;

var server = new Hapi.Server();
server.connection({ port: port });

// server.register(require('hapi-auth-cookie'), function (err) {
//
//     server.auth.strategy('session', 'cookie', {
//         password: 'secret',
//         cookie: 'sid-example',
//         redirectTo: '/login',
//         isSecure: false
//     });
// });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!' + '<BR><BR>' + connection.whatsUp);
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
