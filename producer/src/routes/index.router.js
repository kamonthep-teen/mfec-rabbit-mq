const express = require('express')
const indexRouter = express.Router()
const { sending } = require('./index.controller')

indexRouter.get('/test-send', sending)

module.exports = { indexRouter }
