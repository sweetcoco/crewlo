var Hapi = require('hapi');
var Routes = require('./routes');
var port = process.env.PORT || 3000;
var Inert = require('inert');

var server = new Hapi.Server();
server.connection({ port: port });

// Inert has to be manually registered since >= Hapi 9.0. Essentially it allows us to deliver the /dist file directory for our front end.
// as of right now we actually aren't delivering from directories, but we'll keep it anyway.
server.register(Inert, function() {});

// Register the JWT plugin
server.register(require('hapi-auth-jwt2'), function (err) {
    if(err){
        console.log(err);
    }
    server.auth.strategy('jwt', 'jwt',
        { key: 'NeverShareYourSecret',          // Never Share your secret key TODO:PASS THIS IN AS process.env variable!!
          validateFunc: require('./auth_jwt.js').validateFunc,            // validate function defined above
          verifyOptions: { algorithms: [ 'HS256' ], ignoreExpiration: true } // pick a strong algorithm
        }
    );
    server.auth.default('jwt');
});

server.route(Routes.endpoints);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
