let WebSocketServer = require('websocket').server
let wsServer = null
let configureWebSocket = (server, rootRoute) => {

  wsServer = new WebSocketServer({
    httpServer: server
  });

  wsServer.on('request', function (request) {
    console.log('Client request.');
    let connection = request.accept(null, request.origin);
    rootRoute.addConnection(connection)

    // connection.on('message', function (message) {
    //     if (message.type === 'utf8') {
    //         console.log('Received Message: ' + message.utf8Data);
    //     }
    //     else if (message.type === 'binary') {
    //         console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    //     }
    // });

    connection.on('close', function (connection) {
      rootRoute.removeClosedConnections()
      console.log('Client disconnected.');
    });
  });
}

module.exports = configureWebSocket
