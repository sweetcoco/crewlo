var Hapi = require('hapi');

var port = process.env.PORT || 3000;

var server = new Hapi.Server();
server.connection({ host: '127.0.0.1', port: port });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});


var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});
