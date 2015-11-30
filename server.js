var Hapi = require('hapi');
var Routes = require('./routes');
var connection = require('./database').connection;
var port = process.env.PORT || 3000;

var server = new Hapi.Server();
server.connection({ port: port });

server.register(require('hapi-auth-cookie'), function (err) {
    if (err) {
        throw err;
    }
    server.auth.strategy('session', 'cookie', {
        password: 'subtidepalaceofdoom', // cookie secret
        cookie: 'session', // Cookie name
        redirectTo: false, // Let's handle our own redirections
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });
});

server.route(Routes.endpoints);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
