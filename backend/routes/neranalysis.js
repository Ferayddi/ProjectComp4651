const express = require('express')
// const {register, login} = require('../controllers/userController')
const authentication = require('../middleware/authentication')
router = express.Router()



router.post('/quickresult', authentication.verifyToken,)


module.exports = router
module.exports.router = express()