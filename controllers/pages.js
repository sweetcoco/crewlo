exports.index = {
    auth: false,
	handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
            console.log(request.auth);
            return reply('Oh you are already logged in!');
        }
        return reply('<html><head><title>Login page</title></head><body>'
            + ' <br/>'
            + '<a href="/register">REGISTER HERE</a> <br/>'
            + '<form method="post" action="/login">'
            + 'Username: <input type="text" name="username"><br>'
            + 'Password: <input type="password" name="password"><br/>'
            + '<input type="submit" value="Login"></form></body></html>');
    }
};

exports.register = {
	handler: function (request, reply) {
        return reply('<html><head><title>Register page</title></head><body>'
            + ' <br/>'
            + '<a href="/">BACK HOME</a> <br/>'
            + '<form method="post" action="/register">'
            + 'Username: <input type="text" name="username"><br>'
            + 'Email: <input type="text" name="email"><br>'
            + 'Password: <input type="password" name="password"><br/>'
            + '<input type="submit" value="Register"></form></body></html>');
    }
};
