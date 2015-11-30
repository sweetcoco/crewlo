var Joi = require('joi');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var Boom = require('boom');
var connection = require('../database').connection;
var User = require('../models/user').User;

exports.login = {
	validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().min(2).max(200).required()
        }
    },
    auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {
        var user;
        connection.query('SELECT * FROM dbMain.user_credentials WHERE username = ?', request.payload.username, function(err, result) {
            if (!result.length || err) {
                return reply('that username does not exist, or there was an error <br/>' + err);
            }
            user = result[0];
            bcrypt.compare(request.payload.password, user.password, function(err, res) {
                if(res) {
                    delete user.password; // don't want to set this on the session.
                    delete user.salt; // this either.
                    request.auth.session.set(user);
                    return reply().redirect('/');
                }
            });
        });
    }
};

exports.logout = {
	handler: function (request, reply) {
        request.auth.session.clear();
        return reply('Logout Successful!');
    }
};

exports.register = {
	validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().min(2).max(200).required()
        }
    },
	handler: function (request, reply) {
        var newUser = {
            username: request.payload.username,
            password: request.payload.password,
            email: 'some-email@something.com'
        };
        // var doesUsernameExist = function(username) {
        //     return new Promise(function(fulfill, reject) {
        //         connection.query('SELECT * FROM dbMain.user_credentials WHERE username = ?', username, function(err, result) {
        //             if (err) {
        //                 console.log(err);
        //             }
        //             return fulfill(!!result.length);
        //         });
        //     });
        // };
        // var salt, hash;
        // var hashedPassword = function(password) { // returns hashed password and salt
        //     return new Promise(function(fulfill, reject) {
        //         bcrypt.genSalt(10, function(err, salt) {
        //             bcrypt.hash(password, salt, function(err, hash) {
        //                 newUser.password = hash;
        //                 newUser.salt = salt;
        //                 return fulfill();
        //             });
        //         });
        //     });
        // };
        // var createUser = function(newUser) {
        //     hashedPassword(newUser.password).then(function() {
        //         connection.query('USE dbMain');
        //         connection.query('INSERT INTO user_credentials SET ?', newUser, function(err, result) {
        //             if (err) {
        //                 console.log(err);
        //             }
        //         });
        //     });
        // };

        var someUser = new User();
        someUser.create(newUser).then(function(result) {
            console.log(result);
        });

        // doesUsernameExist(newUser.username)
        //     .then(function(result) {
        //         if (!result) {
        //             createUser(newUser);
        //         } else {
        //         //TODO: something if the username isn't available;
        //         return reply('that username already exists.');
        //         }
        //     });
    }
};
