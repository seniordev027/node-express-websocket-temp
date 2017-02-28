let RootRoutes = require('./RootRoutes');

class Router {
    constructor() { }

    addAll(server) {
        new RootRoutes().add(server);
    }
}

module.exports = Router;