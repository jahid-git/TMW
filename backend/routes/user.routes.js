const express = require('express')
const { login, register, subscription } = require('../controllers/user.controllers.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/subscription', subscription)

module.exports = router