var User = require('./models/user').User;
var Jwt = require('jsonwebtoken');

var validateFunc = function (decoded, request, callback) {
    /*return new User({user_id: decoded.user_id})
        .fetch()
        .then(function(user) {
            if (!user) {
                console.log('no user');
                return callback(null, false);
            } else {
                return callback(null, true);
            }
        });*/
    // the thought process here is, we assign a number to the token, if someone guessed this number it would be extremely impressive.
    // changing the number would of course invalidate all tokens. The number is assigned below in userObj.
    if (decoded.passNumber === 1337) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
};


var jwtSign = function(user) {
    var userObj = {
        user_id: user.user_id,
        username: user.username,
        passNumber: 1337 // number is assigned here
        //created_at: user.created_at
    };

    console.log(userObj);

    var token = Jwt.sign(userObj, 'NeverShareYourSecret');
    return token;
};
exports.validateFunc = validateFunc;
exports.jwtSign = jwtSign;
