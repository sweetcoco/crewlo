var User = require('./models/user').User;
var Jwt = require('jsonwebtoken');

var validateFunc = function (decoded, request, callback) {
    // return new User({user_id: decoded.user_id})
    //     .fetch()
    //     .then(function(user) {
    //         if (!user) {
    //             console.log('no user');
    //             return callback(null, false);
    //         } else {
    //             return callback(null, true);
    //         }
    //     });
    console.log('hi');
    return callback(null, true);
};


var jwtSign = function(user) {
    var userObj = {
        user_id: user.user_id,
        username: user.username,
        //created_at: user.created_at
    };

    console.log(userObj);

    var token = Jwt.sign(userObj, 'NeverShareYourSecret');
    return token;
};
exports.validateFunc = validateFunc;
exports.jwtSign = jwtSign;
