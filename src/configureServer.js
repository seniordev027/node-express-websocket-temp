let configureServer = (server, restify) => {
  server.use(restify.bodyParser())
  server.use(restify.queryParser())
  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

    next()
  })
}

module.exports = configureServer
