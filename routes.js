var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');

exports.endpoints = [
    { method: 'GET',    path: '/register',              config: Pages.register          },
    { method: 'POST',   path: '/register',              config: Authentication.register },
    { method: 'POST',   path: '/login',                 config: Authentication.login    },
    { method: 'POST',   path: '/renew',                 config: Authentication.renew    },
//    { method: 'GET',    path: '/secret',                config: Authentication.secret   },
    { method: 'GET',    path: '/logout',                config: Authentication.logout   },
    { method: 'GET',    path: '/users',                 config: Authentication.users    },
    { method: 'GET',    path: '/{param*}',              config: Pages.index             }
];
