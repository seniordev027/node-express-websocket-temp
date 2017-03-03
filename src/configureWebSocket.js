let socketio = require('socket.io')
let websocket = null
let configureWebSocket = (server, rootRoute) => {
  websocket = socketio.listen(server.server, { path: '/api/chat/connect', origins: 'http://localhost:* http://127.0.0.1:*' });
  websocket.on('connection', (socket) => {
    console.log('new client connected')
    // socket.emit('new-connection', {chatid: req.chat.id, participant: req.participant})
    socket.on('disconnect', () => {
        console.log('Client disconnected.');
    });
  })

  rootRoute.setSocket(websocket)
}

module.exports = configureWebSocket
