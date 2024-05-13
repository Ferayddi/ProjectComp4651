const express = require('express')
const {register, login} = require('../controllers/userController')
const authentication = require('../middleware/authentication')
router = express.Router()

router.post('/register', authentication.validateNewUser, register)
router.post('/login', login)


module.exports = router
module.exports.router = express()
