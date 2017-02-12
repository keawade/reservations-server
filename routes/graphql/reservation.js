const express = require('express')
const router = express.Router()

const Reservation = require('../../models/reservation')

router.get('/reservation', function (req, res) {
  try {
    res.send('yep, reservations here')
  } catch (err) {
    console.error('failed to reservation', err)
    res.status(500).send('fail :(')
  }
})

// nothing here

module.exports = router
