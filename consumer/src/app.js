const express = require('express')
const bodyParser = require('body-parser')

const { indexRouter } = require('./routes/index.router')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(indexRouter)
app.use((req, res, next) => {
    const error = new Error('Not found')
    res.status(404)
    next(error)
})

app.use((error, req, res) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
        },
    })
})

module.exports = app
