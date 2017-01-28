const express = require('express')
const router = express.Router()

const Room = require('../models/room')

router.get('/room', function (req, res) {
  try {
    Room.find({}, '_id name reservations')
      .then((rooms) => {
        res.send(rooms)
      })
      .catch((error) => {
        console.error('error:', error)
        res.status(500).send(error)
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send(err)
  }
})

router.post('/room', function (req, res) {
  try {
    if (!req.body.name) {
      console.error('Missing required fields', req.body)
      res.status(400).send('Missing required fields')
      return
    }
    const room = new Room({
      name: req.body.name,
      reservations: []
    })
    room.save()
      .then((newRoom) => {
        res.send({
          _id: newRoom._id,
          name: newRoom.name,
          reservations: newRoom.reservations
        })
      })
      .catch((error) => {
        console.error('failed to create room', error)
        res.status(500).send(error)
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send(err)
  }
})

router.get('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id }, '_id name reservations')
    .then((room) => {
      res.send(room)
    })
    .catch((error) => {
      console.error('failed to find room', error)
      res.status(404).send(error)
    })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send(err)
  }
})

router.put('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id })
      .then((room) => {
        room.name = req.body.name ? req.body.name : room.name
        room.reservations = req.body.reservations ? req.body.reservations : room.reservations
        room.save()
          .then((updatedRoom) => {
            res.send({
              _id: updatedRoom._id,
              name: updatedRoom.name,
              reservations: updatedRoom.reservations
            })
          })
          .catch((error) => {
            console.error('error:', error)
            res.status(500).send(error)
          })
      })
      .catch((error) => {
        console.error('error:', error)
        res.status(500).send(error)
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send(err)
  }
})

router.delete('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id })
      .then((room) => {
        room.remove()
          .then(() => {
            res.send({'deleted': true})
          })
          .catch((error) => {
            console.error('failed to delete room', req.params._id)
            res.status(500).send(error)
          })
      })
      .catch((error) => {
        console.error('failed to find room for deletion', req.params._id, error)
        res.status(404).send({ 'deleted': false })
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send(err)
  }
})

module.exports = router
