let Router = require('./routes/Router');
let router = new Router();

let configureServer = (server, restify) => {
    server.use(restify.bodyParser());
    server.use(restify.queryParser());
    server.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    router.addAll(server);
}

module.exports = configureServer;