const express = require('express')

const server = express()

server.get('*', function (req, res) {
  res.send('yo')
})

console.log('listening at localhost:3000')
server.listen(3000)
