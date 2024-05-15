const DataSet = require('../models/dataset');
const User = require('../models/user');

const fs = require('fs')
const uploadDataset = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                userName: res.userName,
            },
        });
        const datasetFile = req.file;

        let datasetSize = datasetFile.size;
        let datasetSizeUnit = 'B';

        if (datasetSize >= 1024 * 1024) {
            datasetSize = (datasetSize / (1024 * 1024)).toFixed(2); // Convert to MB with 2 decimal places
            datasetSizeUnit = 'MB';
        } else if (datasetSize >= 1024) {
            datasetSize = (datasetSize / 1024).toFixed(2); // Convert to KB with 2 decimal places
            datasetSizeUnit = 'KB';
        }

        await DataSet.create({
            datasetName: datasetFile.originalname,
            datasetSize: datasetSize,
            datasetSizeUnit: datasetSizeUnit,
            datasetUrl: datasetFile.path,
            userId: user.id
        });

        return res.status(200).json({ status: 200});
    } catch (error) {
        console.log(error)
        fs.unlinkSync(req.file.path);
        if (error.code) return res.status(error.code).json({status: error.code, error: error.error})
        return res.status(500).json({status: 500, error: "Internal Server Error"})
    }
};

module.exports = {
    uploadDataset
};
