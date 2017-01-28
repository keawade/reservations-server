const express = require('express')

const router = module.exports = express.Router()

router.use(require('./room'))
router.use(require('./reservation'))

router.get('*', function (req, res) {
  res.status(404).send({ message: 'resource not found' })
})
