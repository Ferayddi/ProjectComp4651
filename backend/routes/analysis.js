const express = require('express')
const {quickresult} = require('../controllers/neranalysisController')
const {datasetAnalysis} = require('../controllers/datasetAnalysisController')

const authentication = require('../middleware/authentication')
router = express.Router()


router.post('/new', authentication.verifyToken, datasetAnalysis)


module.exports = router
module.exports.router = express()