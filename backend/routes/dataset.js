const express = require('express')
const {uploadDataset, getListOfDataSets, deleteADataSet} = require('../controllers/datasetController')
const authentication = require('../middleware/authentication')
const upload = require('../middleware/upload')
router = express.Router()

router.post('/', authentication.verifyToken, upload.single('dataset'), uploadDataset)
router.get('/', authentication.verifyToken, getListOfDataSets)
router.delete('/', authentication.verifyToken, deleteADataSet);


module.exports = router
module.exports.router = express()
