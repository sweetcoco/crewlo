var Joi = require('joi');
var Bcrypt = require('bcrypt');
var Promise = require('bluebird');
var Boom = require('boom');
var User = require('../models/user').User;
var jwtSign = require('../auth_jwt').jwtSign;

exports.login = {
	// validate: {
    //     payload: {
    //         username: Joi.string().required(),
    //         password: Joi.string().min(2).max(200).required()
    //     }
    // },
    auth: false,
	handler: function (request, reply) {
        User.login(request.payload.username, request.payload.password)
            .then(function(user) {
                // do something?
                console.log('this does stuff');
                return createWebToken(user.attributes);
            }).catch(User.NotFoundError, function() {
                reply('error, username not found');
            }).catch(function(err) {
                console.log(err + ' ya suck');
            });

            var createWebToken = function(user) {
                var token = jwtSign(user);
                return reply({token: token}).header("Authorization", token);
            };
    }
};

exports.renew = {
    //auth: 'jwt',
	handler: function (request, reply) {
        console.log('renewing!');
        var token = jwtSign(request.payload);
        console.log(token);
        reply({token: token})
            .header("Authorization", token);
    }
};

exports.users = {
    auth: 'jwt',
	handler: function (request, reply) {
        console.log('something');
        reply({text: "hey look at you using tokens!"})
            .header("Authorization", request.headers.authorization);
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
            password: Joi.string().min(2).max(200).required(),
            email: Joi.string().required()
        }
    },
	handler: function (request, reply) {
        console.log(request.payload);
        return User.registerUser(request.payload)
            .then(function(result) {
                console.log(result);
                return reply(result);
            }).catch(Boom.unauthorized , function(err) {
                reply(err);
            }).catch(function(err) {
                console.log(err + ' ya suck');
            });
        // var newUser = {
        //     username: request.payload.username,
        //     password: request.payload.password,
        //     email: 'some-email@something.com'
        // };
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

        // var someUser = new User();
        // someUser.create(newUser).then(function(result) {
        //     console.log(result);
        // });

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
