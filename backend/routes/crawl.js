const express = require('express')
const {crawlReddit, crawlGoogle} = require('../controllers/crawlController')
const authentication = require('../middleware/authentication')
router = express.Router()


router.post('/crawlReddit', authentication.verifyToken,crawlReddit)
router.post('/crawlGoogle', authentication.verifyToken,crawlGoogle)

module.exports = router
module.exports.router = express()