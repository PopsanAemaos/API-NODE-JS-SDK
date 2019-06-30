var service = require('./blockchain/service')
var express = require('./config/express')
const logger = require('./Util/logger.js')
var app = express()

new service().Init()

const port = process.env.PORT || 8000
app.listen(port, () => {
  logger.info('http://localhost:'+port+'/api-docs/')
  // http://localhost:9999/api-docs/

  logger.info('Start server at port ' + port)
})
