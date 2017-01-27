const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:3001/reservations')
console.log('db connected')

const server = express()

server.get('*', function (req, res) {
  res.send('yo')
})

console.log('listening at localhost:3000')
server.listen(3000)
