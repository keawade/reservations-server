const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:3001/reservations')
mongoose.Promise = global.Promise
console.log('db connected')

const app = express()

app.use(bodyParser.json())

const Room = require('./models/room')
const Reservation = require('./models/reservation')

app.get('/room', function (req, res) {
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
    res.status(400).send(err)
  }
})

app.post('/room', function (req, res) {
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
    room.save(function (err, newRoom) {
      if (err) {
        console.error('failed to create room', err)
        res.status(500).send(err)
        return
      }
      res.send({
        _id: newRoom._id,
        name: newRoom.name,
        reservations: newRoom.reservations
      })
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id }, '_id name reservations', function (err, room) {
      if (err) {
        console.error('error:', err)
        res.status(500).send(err)
        return
      }
      if (room) {
        console.log('found room', room)
        res.send(room)
      } else {
        console.log('room not found')
        res.send('Error: room not found')
      }
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.put('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id }, function (err, room) {
      if (err) {
        console.error('error:', err)
        res.status(500).send(err)
        return
      }
      room.name = req.body.name ? req.body.name : room.name
      room.reservations = req.body.reservations ? req.body.reservations : room.reservations
      room.save(function (err, updatedRoom) {
        if (err) {
          console.error('error:', err)
          res.status(500).send(err)
          return
        }
        res.send({
          _id: updatedRoom._id,
          name: updatedRoom.name,
          reservations: updatedRoom.reservations
        })
      })
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.delete('/room/:id', function (req, res) {
  try {
    Room.findOne({ '_id': req.params.id }, function (err, room) {
      if (err) {
        console.error('error:', err)
        res.status(500).send(err)
        return
      }
      room.reservations.map((roomReserv) => {
        Reservation.findOne({ '_id': roomReserv._id }, function (err, reservation) {
          if (err) {
            console.error('error:', err)
            return
          }
          reservation.remove(function (err) {
            if (err) {
              console.error('error:', err)
              return
            }
          })
        })
      })
      room.remove(function (err) {
        if (err) {
          console.error('error:', err)
          res.status(500).send(err)
          return
        }
        res.send('deleted')
      })
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.post('/reservation', function (req, res) {
  try {
    if (
      !req.body.meetingName ||
      !req.body.owner ||
      !req.body.ownerEmail ||
      !req.body.start ||
      !req.body.end
    ) {
      console.warn('failed to create reservation: missing body arguments')
      res.status(400).send('Invalid body')
      return
    }
    const reservation = new Reservation({
      meetingName: req.body.meetingName,
      owner: req.body.owner,
      ownerEmail: req.body.ownerEmail,
      start: req.body.start,
      end: req.body.end
    })
    reservation.save(function (err, newReservation) {
      if (err) {
        console.error('failed to create reservation', err)
        res.status(500).send(err)
        return
      }
      console.log('created reservation', newReservation._id)
      res.send({
        _id: newReservation._id,
        meetingName: newReservation.meetingName,
        owner: newReservation.owner,
        ownerEmail: newReservation.ownerEmail,
        start: newReservation.start,
        end: newReservation.end
      })
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/reservation/:id', function (req, res) {
  try {
    Reservation.findOne({ '_id': req.params.id }, function (err, reservation) {
      if (err) {
        console.error('error:', err)
        res.status(500).send(err)
        return
      }
      console.log('got reservation', reservation._id)
      res.send({
        _id: reservation._id,
        meetingName: reservation.meetingName,
        owner: reservation.owner,
        ownerEmail: reservation.ownerEmail,
        start: reservation.start,
        end: reservation.end
      })
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.put('/reservation/:id', function (req, res) {
  try {
    if (
      !req.body.meetingName &&
      !req.body.owner &&
      !req.body.ownerEmail &&
      !req.body.start &&
      !req.body.end
    ) {
      console.warn('failed to update reservation: missing body arguments')
      res.status(400).send('Invalid body')
    }
    Reservation.findOne({ '_id': req.params.id }, function (err, reservation) {
      if (err) {
        console.warn('could not find reservation', req.params.id, err)
        res.status(404).send(err)
        return
      }
      reservation.meetingName = req.body.meetingName ? req.body.meetingName : reservation.meetingName
      reservation.owner = req.body.owner ? req.body.owner : reservation.owner
      reservation.ownerEmail = req.body.ownerEmail ? req.body.ownerEmail : reservation.ownerEmail
      reservation.start = req.body.start ? req.body.start : reservation.start
      reservation.end = req.body.end ? req.body.end : reservation.end
      reservation.save(function (err, updatedReservation) {
        if (err) {
          console.error('failed to update reservation', err)
          res.status(500).send(err)
          return
        }
        console.log('updated reservation', updatedReservation._id)
        res.send({
          _id: updatedReservation._id,
          meetingName: updatedReservation.meetingName,
          owner: updatedReservation.owner,
          ownerEmail: updatedReservation.ownerEmail,
          start: updatedReservation.start,
          end: updatedReservation.end
        })
      })
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/reservation/:id', function (req, res) {
  try {
    Reservation.findOne({ '_id': req.params.id }, function (err, reservation) {
      if (err) {
        console.error('failed to find reservation for deletion', req.params.id, err)
        res.status(404).send(err)
        return
      }
      reservation.remove(function (err) {
        if (err) {
          console.error('failed to delete reservation', req.params.id, err)
          res.status(500).send(err)
          return
        }
        res.send('deleted')
      })
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

app.all('*', function (req, res) {
  res.status(404).send('not found')
})

console.log('listening at localhost:3000')
app.listen(3000)
