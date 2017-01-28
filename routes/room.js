const express = require('express')
const router = express.Router()

const Room = require('../models/room')
const Reservation = require('../models/reservation')

router.get('/room', function (req, res) {
  try {
    Room.find({}, '_id name reservations', function (err, rooms) {
      if (err) {
        console.error('error:', err)
        res.status(500).send(err)
        return
      }
      console.log('returning all rooms')
      res.send(rooms)
    })
  } catch (err) {
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
        console.log('created new room', newRoom._id)
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
    res.status(500).send(err)
  }
})

router.get('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id }, '_id name reservations')
    .then((room) => {
      if (room) {
        console.log('found room', room)
        res.send(room)
      } else {
        console.log('room not found')
        res.send('Error: room not found')
      }
    })
    .catch((error) => {
      console.error('error:', error)
      res.status(500).send(error)
    })
  } catch (err) {
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
            console.log('updated room', updatedRoom._id)
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
    res.status(500).send(err)
  }
})

router.delete('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id })
      .then((room) => {
        const promises = room.reservations.map((roomReserv) => {
          return Reservation.findOne({ '_id': roomReserv._id })
        })
        Promise.all(promises)
          .then((reservations) => {
            const delPromises = reservations.map((reservation) => {
              return reservation.remove()
            })
            Promise.all(delPromises)
              .then(() => {
                console.log('deleted reservations')
                room.remove()
                  .then(() => {
                    res.send({'deleted': true})
                  })
                  .catch((error) => {
                    console.error('error:', error)
                    res.status(500).send(error)
                  })
              })
              .catch((error) => {
                console.error('failed to delete reservation', error)
              })
          })
          .catch((error) => {
            console.log('failed to find reservations', error)
          })
        .catch((error) => {
          console.error('error:', error)
          res.status(500).send(error)
        })
      })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
