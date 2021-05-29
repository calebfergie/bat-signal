'use strict'

const config  = require('./config'),
restify = require('restify'),
mongodb = require('mongodb').MongoClient
const server = restify.createServer({
name    : config.name,
version : config.version
})
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())
server.listen(config.port, () => {
// establish connection to mongodb atlas
mongodb.connect(config.db.uri, (err, db) => { if (err) {
     console.log('An error occurred while attempting to connect to MongoDB', err)
     process.exit(1)
 }

 console.log(
     '%s v%s ready to accept connections on port %s in %s environment.',
     server.name,
     config.version,
     config.port,
     config.env
 )
})
 require('./routes')({ db, server })
