var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');

exports.endpoints = [
    { method: 'GET',    path: '/register',              config: Pages.register          },
    { method: 'POST',   path: '/register',              config: Authentication.register },
    { method: 'POST',   path: '/login',                 config: Authentication.login    },
    { method: 'GET',    path: '/logout',                config: Authentication.logout   },
    { method: 'GET',    path: '/{param*}',              config: Pages.index             }
];
