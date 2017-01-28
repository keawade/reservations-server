const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
  meetingName: String,
  owner: String,
  ownerEmail: String,
  start: String,
  end: String
})

module.exports = mongoose.model('Reservation', reservationSchema)
