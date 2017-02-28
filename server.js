let restify = require('restify');
let configureServer = require('./src/configureServer');
let config = require('config');

let server = restify.createServer();

configureServer(server, restify);

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
