const express = require('express')
const {quickresult} = require('../controllers/neranalysisController')
const authentication = require('../middleware/authentication')
router = express.Router()



router.post('/quickresult', authentication.verifyToken,quickresult)


module.exports = router
module.exports.router = express()