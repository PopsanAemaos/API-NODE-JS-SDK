var service = require('./blockchain//service')
var express = require('./config/express')
var app = express()

new service().Init()

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Start server at port ' + port)
})
