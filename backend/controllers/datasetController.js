const DataSet = require('../models/dataset');
const User = require('../models/user');
const path = require('path');

const fs = require('fs')
const Sequelize = require("sequelize");
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
        fs.unlinkSync(req.file.path);
        if (error.code) return res.status(error.code).json({status: error.code, error: error.error})
        return res.status(500).json({status: 500, error: "Internal Server Error"})
    }
};

const getListOfDataSets = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                userName: res.userName,
            },
        });

        const datasets = await DataSet.findAll({
            where: {
                userId: user.id,
            },
            attributes: [
                'id',
                'datasetName',
                'datasetSize',
                'datasetSizeUnit',
                'datasetUrl',
                'createdAt',
            ],
        });

        const formattedDatasets = datasets.map((dataset) => {
            const createdAt = new Date(dataset.createdAt);
            const year = createdAt.getFullYear();
            const month = String(createdAt.getMonth() + 1).padStart(2, '0');
            const day = String(createdAt.getDate()).padStart(2, '0');
            const formattedCreatedAt = `${year}-${month}-${day}`;

            return {
                ...dataset.dataValues,
                createdAt: formattedCreatedAt,
            };
        });

        return res.status(200).json({ status: 200, datasets: formattedDatasets });
    } catch (error) {
        if (error.code) {
            return res.status(error.code).json({ status: error.code, error: error.error });
        }
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};


const deleteADataSet = async (req, res) => {
    try {

        const datasetId = req.body.id;

        const dataset = await DataSet.findOne({ where: { id: datasetId } });
        if (!dataset) {
            return res.status(404).json({ status: 404, error: 'Dataset not found' });
        }

        const datasetUrl = dataset.datasetUrl;

        await DataSet.destroy({ where: { id: datasetId } });

        // Delete the file
        if (datasetUrl) {
            const uploadPath = path.join(__dirname, '../', datasetUrl);
            fs.unlinkSync(uploadPath);
        }


        return res.status(200).json({ status: 200});
    } catch (error) {
        console.log(error)
        if (error.code) {
            return res.status(error.code).json({ status: error.code, error: error.error });
        }
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};

module.exports = {
    uploadDataset,
    getListOfDataSets,
    deleteADataSet,
};
