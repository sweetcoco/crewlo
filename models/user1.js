var Joi = require('joi');
var Boom = require('boom');
var Bcrypt = require('bcrypt');
var Connection = require('../database').connection;

var User = function() {
    var self = this;
    this.generatePasswordHash = function(password) {
        var promise = new Promise(function(resolve, reject) {
            Bcrypt.genSalt(10, function(err, salt) {
                Bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        var result = {salt: salt, hash: hash};
                        resolve(result);
                    }
                });
            });
        });
        return promise;
    };

    this.create = function(newUser) {
        var promise = new Promise(function(resolve, reject) {

            self.findByUsername(newUser.username).then(function(usernameResults) {
                if (usernameResults.length) {
                    return resolve(Boom.unauthorized('That username is already in use'));
                }

                self.findByEmail(newUser.email).then(function(emailResults) {
                    if (emailResults.length) {
                        return resolve(Boom.unauthorized('That email is already in use'));
                    }

                    self.generatePasswordHash(newUser.password).then(function(newHash) {
                        // TODO: find some way to snag an error here

                        var thisNewUser = {
                            isActive: 'Y',
                            username: newUser.username.toLowerCase(),
                            email: newUser.email.toLowerCase(),
                            password: newHash.hash,
                            salt: newHash.salt,
                            timeCreated: new Date()
                        };


                        //connection.query('USE dbMain');
                        Connection.query('INSERT INTO dbMain.user_credentials SET ?', thisNewUser, function(err, results) {
                            console.log('4');
                            if (err) {
                                console.log(err);
                            }
                            resolve(results);
                        });
                    }); // generatePasswordHash
                }); // findByEmail
            }); // findByUsername
        });
        return promise;
    };

    this.findByUsername = function(username) {
        var promise = new Promise(function(resolve, reject) {
            Connection.query('SELECT * FROM dbMain.user_credentials WHERE username = ?', username, function(err, results) {
                if (err) {
                    console.log(err);
                }
                resolve(results);
            });
        });
        return promise;
    };

    this.findByEmail = function(email) {
        var promise = new Promise(function(resolve, reject) {
            Connection.query('SELECT * FROM dbMain.user_credentials WHERE email = ?', email, function(err, results) {
                if (err) {
                    console.log(err);
                }
                resolve(results);
            });
        });
        return promise;
    };
};



exports.User = User;
