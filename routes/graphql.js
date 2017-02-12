const express = require('express')
const router = express.Router()
const graphqlHTTP = require('express-graphql')
const getSchema = require('@risingstack/graffiti-mongoose').getSchema

const Reservation = require('../models/reservation')
const Room = require('../models/room')

const qlSchema = getSchema([Reservation, Room], {
  mutation: true,
  allowMongoIDMutation: false
})

router.use('/', graphqlHTTP({
  schema: qlSchema,
  graphiql: true
}))

module.exports = router
