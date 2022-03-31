const http = require('http')

require('dotenv').config()

const app = require('./app.js')

const PORT = 8000

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
