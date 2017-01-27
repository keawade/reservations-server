const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
  meetingName: String,
  owner: String,
  ownerEmail: String,
  start: Date,
  end: Date
})

module.exports = mongoose.model('Reservation', reservationSchema)
