var express = require('express')
var bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const ORG = process.env.ORG
const swaggerDocument = require(`../swagger/swagger${ORG}.json`);
module.exports = function()
{
    var app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.text())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    require('../router/index.js')(app)
    return app
}
