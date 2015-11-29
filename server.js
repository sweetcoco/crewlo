'use strict';
var http = require("http"),
    mysql = require("mysql"),
    mysqlServer = mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
    });

mysqlServer.connect(function(err) {
    if (err) {
        process.env['msg'] = 'Unable to connect to RDS - ' + err;
    } else {
        process.env['msg'] = 'Success! connected to RDS via ' + process.env.RDS_HOSTNAME;
    }
});

http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write(process.env['msg']);
    response.end();
}).listen(process.env.PORT || 3000);
