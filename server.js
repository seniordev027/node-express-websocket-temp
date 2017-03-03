let restify = require('restify')
let configureServer = require('./src/configureServer')
let configureWebSocket = require('./src/configureWebSocket')
let config = require('config')
let RootRoutes = require('./src/routes/RootRoutes')

let server = restify.createServer()
configureServer(server, restify)
let rootRoutes = new RootRoutes()
rootRoutes.add(server)

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url)
})

configureWebSocket(server, rootRoutes)