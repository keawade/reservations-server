const express = require('express')
const router = express.Router()

const Reservation = require('../models/reservation')

router.get('/reservation', function (req, res) {
  try {
    Reservation.find({}, '_id meetingName owner ownerEmail start end')
      .then((reservations) => {
        res.status(200).send(reservations)
      })
      .catch((error) => {
        console.error('failed to find reservations', error)
        res.status(500).send({ message: 'internal error' })
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send({ message: 'internal error' })
  }
})

router.post('/reservation', function (req, res) {
  try {
    if (!req.body.meetingName || !req.body.owner || !req.body.ownerEmail || !req.body.start || !req.body.end) {
      console.warn('failed to create reservation: missing body arguments', req.body)
      res.status(400).send({ message: 'invalid body' })
      return
    }
    const reservation = new Reservation({
      meetingName: req.body.meetingName,
      owner: req.body.owner,
      ownerEmail: req.body.ownerEmail,
      start: req.body.start,
      end: req.body.end
    })
    reservation.save()
      .then((newReservation) => {
        res.status(201).send({
          _id: newReservation._id,
          meetingName: newReservation.meetingName,
          owner: newReservation.owner,
          ownerEmail: newReservation.ownerEmail,
          start: newReservation.start,
          end: newReservation.end
        })
      })
      .catch((error) => {
        console.error('failed to create reservation', error)
        res.status(500).send({ message: 'internal error' })
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send({ message: 'internal error' })
  }
})

router.get('/reservation/:id', function (req, res) {
  try {
    Reservation.findOne({ '_id': req.params.id })
      .then((reservation) => {
        res.status(200).send({
          _id: reservation._id,
          meetingName: reservation.meetingName,
          owner: reservation.owner,
          ownerEmail: reservation.ownerEmail,
          start: reservation.start,
          end: reservation.end
        })
      })
      .catch((error) => {
        console.error('message:', error)
        res.status(404).send({ message: 'reservation does not exist' })
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send({ message: 'internal error' })
  }
})

router.put('/reservation/:id', function (req, res) {
  try {
    if (
      !req.body.meetingName &&
      !req.body.owner &&
      !req.body.ownerEmail &&
      !req.body.start &&
      !req.body.end
    ) {
      console.warn('failed to update reservation: missing body arguments')
      res.status(400).send({ message: 'Invalid body' })
    }
    Reservation.findOne({ '_id': req.params.id })
      .then((reservation) => {
        reservation.meetingName = req.body.meetingName ? req.body.meetingName : reservation.meetingName
        reservation.owner = req.body.owner ? req.body.owner : reservation.owner
        reservation.ownerEmail = req.body.ownerEmail ? req.body.ownerEmail : reservation.ownerEmail
        reservation.start = req.body.start ? req.body.start : reservation.start
        reservation.end = req.body.end ? req.body.end : reservation.end
        reservation.save()
          .then((updatedReservation) => {
            res.status(200).send({
              _id: updatedReservation._id,
              meetingName: updatedReservation.meetingName,
              owner: updatedReservation.owner,
              ownerEmail: updatedReservation.ownerEmail,
              start: updatedReservation.start,
              end: updatedReservation.end
            })
          })
          .catch((error) => {
            console.error('failed to update reservation', error)
            res.status(500).send({ message: 'internal error' })
          })
      })
      .catch((error) => {
        console.warn('could not find reservation', req.params.id, error)
        res.status(404).send({ message: 'reservation does not exist' })
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send({ message: 'internal error' })
  }
})

router.delete('/reservation/:id', function (req, res) {
  try {
    Reservation.findOne({ '_id': req.params.id })
      .then((reservation) => {
        reservation.remove()
          .then(() => {
            res.status(200).send({ message: 'reservation deleted' })
          })
          .catch((error) => {
            console.error('failed to delete reservation', req.params.id, error)
            res.status(500).send({ message: 'internal error' })
          })
      })
      .catch((error) => {
        console.warn('failed to find reservation for deletion', req.params.id, error)
        res.status(404).send({ message: 'reservation does not exist' })
      })
  } catch (err) {
    console.error('general error', err)
    res.status(500).send({ message: 'internal error' })
  }
})

module.exports = router
