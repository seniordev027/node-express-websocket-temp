let RootRoutes = require('./RootRoutes');

class Router {
    addAll(server) {
        new RootRoutes().add(server);
    }
}

module.exports = Router;