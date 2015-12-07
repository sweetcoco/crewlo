var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING || require('./config.js').awsPostgres.CONSTRING || taco,
  searchPath: 'knex,public'
});

var bookshelf = require('bookshelf')(pg);
//TODO: remove the connection inclusion in all files.

exports.pg = pg;
exports.bookshelf = bookshelf;
