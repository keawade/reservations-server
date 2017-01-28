const express = require('express')

const router = module.exports = express.Router()

router.use(require('./room'))
router.use(require('./reservation'))
