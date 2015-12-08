var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');
var Api = require('./controllers/api');
var loginHandler = process.env.PG_CONNECTION_STRING ? Pages.index : Pages.indexLocal; // check to see if that variable is truthy so we know which index file to deliver.

exports.endpoints = [
    { method: 'POST',   path: '/register',              config: Authentication.register },
    { method: 'POST',   path: '/login',                 config: Authentication.login    },
    { method: 'POST',   path: '/renew',                 config: Authentication.renew    },
    { method: 'POST',   path: '/scraper',               config: Api.scraper             },
    { method: 'GET',    path: '/logout',                config: Authentication.logout   },
    { method: 'GET',    path: '/users',                 config: Authentication.users    },
    { method: 'GET',    path: '/{param*}',              config: loginHandler            }
];
