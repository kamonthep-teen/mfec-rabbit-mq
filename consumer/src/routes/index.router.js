const express = require('express')
const indexRouter = express.Router()
const { receive } = require('./index.controller')

indexRouter.get('/test-receive', receive)

module.exports = { indexRouter }
