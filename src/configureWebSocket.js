let WebSocketServer = require('websocket').server
let wsServer = null
let configureWebSocket = (server, rootRoute) => {
  wsServer = new WebSocketServer({
    httpServer: server
  });

  wsServer.on('request', function (request) {
    let connection = request.accept(null, request.origin);
    rootRoute.addConnection(connection)

    connection.on('close', function (connection) {
      rootRoute.removeClosedConnections()
    });
  });
}

module.exports = configureWebSocket
