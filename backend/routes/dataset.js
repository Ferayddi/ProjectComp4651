const express = require('express')
const {uploadDataset, getListOfDataSets } = require('../controllers/datasetController')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/upload')
router = express.Router()

router.post('/', authentication.verifyToken, upload.single('dataset'), uploadDataset)
router.get('/', authentication.verifyToken, getListOfDataSets)


module.exports = router
module.exports.router = express()
