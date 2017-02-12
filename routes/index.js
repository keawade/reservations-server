const express = require('express')

const router = module.exports = express.Router()

router.use('/rest', require('./rest'))
router.use('/graphql', require('./graphql'))

router.get('*', function (req, res) {
  res.status(404).send({ message: 'resource not found' })
})
