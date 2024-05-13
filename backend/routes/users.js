const express = require('express')
const {register} = require('../controllers/userController')
const authentication = require('../middleware/authentication')
router = express.Router()

router.post('/register', authentication.validateNewUser, register)


module.exports = router
module.exports.router = express()
