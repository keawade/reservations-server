const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reservations: [String]
})

module.exports = mongoose.model('Room', roomSchema)
