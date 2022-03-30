const express = require('express')
const indexRouter = express.Router()
const { receive, sending } = require('./index.controller')

indexRouter.get('/test-send', sending)
indexRouter.get('/test-receive', receive)

module.exports = { indexRouter }
