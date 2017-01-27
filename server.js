const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:3001/reservations')
console.log('db connected')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const Room = require('./models/room')
const Reservation = require('./models/reservation')

app.get('/room', function (req, res) {
  Room.find({}, 'name', function (err, rooms) {
    if (err) {
      console.error('error:', err)
      res.status(500).send(err)
      return
    }
    console.log('returning all rooms')
    res.send(rooms)
  })
})

app.post('/room', function (req, res) {
  if (!req.body.name) {
    console.error('Missing required fields')
    res.status(400).send('Missing required fields')
    return
  }
  const template = {
    name: req.body.name,
    reservations: []
  }
  const room = new Room(template)
  room.save(function (err, newRoom) {
    if (err) {
      console.error('failed to create room', template, err)
      res.status(500).send(err)
      return
    }
    res.send(newRoom)
  })
})

app.get('/room/:id', function (req, res) {
  Room.findOne({ '_id': req.params.id }, 'name', function (err, room) {
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
})

app.put('/room/:id', function (req, res) {
  if (!req.body.name || !req.body.reservations) {
    console.error('Missing required fields')
    res.status(400).send('Invalid body')
    return
  }
  const update = {
    name: req.body.name,
    reservations: req.body.reservations
  }
  Room.findOne({ '_id': req.params.id }, function (err, room) {
    if (err) {
      console.error('error:', err)
      res.status(500).send(err)
      return
    }
    Object.assign(room, update)
    room.save(function (err, updatedRoom) {
      if (err) {
        console.error('error:', err)
        res.status(500).send(err)
        return
      }
      res.send(updatedRoom)
    })
  })
})

app.delete('/room/:id', function (req, res) {
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
})

app.post('/reservation', function (req, res) {
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
    res.send(newReservation)
  })
})

app.get('/reservation/:id', function (req, res) {
  Reservation.findOne({ '_id': req.params.id }, function (err, reservation) {
    if (err) {
      console.error('error:', err)
      res.status(500).send(err)
      return
    }
    console.log('got reservation by id', reservation)
    res.send(reservation)
  })
})

app.put('/reservation/:id', function (req, res) {
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
      console.log('updated reservation', updatedReservation)
      res.send(updatedReservation)
    })
  })
})

app.delete('/reservation/:id', function (req, res) {
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
})

app.all('*', function (req, res) {
  res.status(404).send('not found')
})

console.log('listening at localhost:3000')
app.listen(3000)
