const express = require('express')
const router = express.Router()

const Room = require('../../models/room')

router.get('/room', function (req, res) {
  try {
    res.send('yep, rooms here')
  } catch (err) {
    console.error('failed to room', err)
    res.status(500).send('fail :(')
  }
})

// nothing here

module.exports = router
