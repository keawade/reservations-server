const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes')

mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpass}@ds011923.mlab.com:11923/reservations`)
mongoose.Promise = global.Promise
console.log('db connected')

const app = express()

app.use(bodyParser.json())

app.use('/', routes)

console.log('listening at localhost:3000')
app.listen(process.env.PORT || 3000)

module.exports = app
