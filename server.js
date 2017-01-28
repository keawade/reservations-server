const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes')

mongoose.connect('mongodb://localhost:3001/reservations')
mongoose.Promise = global.Promise
console.log('db connected')

const app = express()

app.use(bodyParser.json())

app.use('/', routes)

console.log('listening at localhost:3000')
app.listen(3000)

module.exports = app
