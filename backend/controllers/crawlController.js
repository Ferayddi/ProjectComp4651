
const { spawn } = require('child_process');
const DataSet = require('../models/dataset');
const User = require('../models/user');
const fs = require('fs')
const path = require('path');

/**
 * Format of crawlReddit script: py crawlingcode.py reddit_crawl "beagles" 10 1
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const crawlReddit = async (req, res) => {
    try {
        const { search_query, num_posts, dataset_name } = req.body;

        const pythonProcess = spawn('python', ['../backend/python_crawl_files/crawlingcode.py', 'reddit_crawl', search_query, num_posts, 1]);

        let pythonOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            const output = data.toString();
            if (!output.startsWith('Requirement already satisfied:')) {
                pythonOutput += data;
            }
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            console.log(`Python script exited with code ${code}`);

            const filePath = `uploads\\${res.userName}\\crawlReddit\\${dataset_name}.txt`;
            const directoryPath = path.dirname(filePath);
            fs.mkdirSync(directoryPath, { recursive: true });
            fs.writeFileSync(filePath, pythonOutput);

            let datasetSize = fs.statSync(filePath).size;
            let datasetSizeUnit = 'B';

            if (datasetSize >= 1024 * 1024) {
                datasetSize = (datasetSize / (1024 * 1024)).toFixed(2);
                datasetSizeUnit = 'MB';
            } else if (datasetSize >= 1024) {
                datasetSize = (datasetSize / 1024).toFixed(2);
                datasetSizeUnit = 'KB';
            }

            const user = await User.findOne({
                where: {
                    userName: res.userName,
                },
            });

            const dataset = await DataSet.create({
                datasetName: `${dataset_name}.txt`,
                datasetSize: datasetSize,
                datasetSizeUnit: datasetSizeUnit,
                datasetUrl: filePath,
                userId: user.id
            });

            console.log("Text file created and dataset stored.");

            return res.status(200).json({ status: 200 });
        });
    } catch (error) {
        if (error.code) {
            return res.status(error.code).json({ status: error.code, error: error.error });
        }
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};

const crawlGoogle = async (req, res) =>{
    try{
        const {search_query, num_links, dataset_name} = req.body;

        const pythonProcess = spawn('python', ['../backend/python_crawl_files/crawlingcode.py', 'google_crawl', search_query, num_links, 1]);
        
        let pythonOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            // const output = data.toString();
            // if (!output.startsWith('Requirement already satisfied:')) {
            //     pythonOutput += data;
            // }
            pythonOutput += data;
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            console.log(`Python script exited with code ${code}`);

            const filePath = `uploads\\${res.userName}\\crawlGoogle\\${dataset_name}.txt`;
            const directoryPath = path.dirname(filePath);
            fs.mkdirSync(directoryPath, {recursive: true});
            fs.writeFileSync(filePath, pythonOutput);

            let datasetSize = fs.statSync(filePath).size;
            let datasetSizeUnit = 'B';

            if (datasetSize >= 1024 * 1024) {
                datasetSize = (datasetSize / (1024 * 1024)).toFixed(2);
                datasetSizeUnit = 'MB';
            } else if (datasetSize >= 1024) {
                datasetSize = (datasetSize / 1024).toFixed(2);
                datasetSizeUnit = 'KB';
            }

            const user = await User.findOne({
                where: {
                    userName: res.userName,
                },
            });

            const dataset = await DataSet.create({
                datasetName: `${dataset_name}.txt`,
                datasetSize: datasetSize,
                datasetSizeUnit: datasetSizeUnit,
                datasetUrl: filePath,
                userId: user.id
            });

            console.log("Text file created and dataset stored.");

            return res.status(200).json({status: 200});
        });
    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}

module.exports = {
    crawlReddit,
    crawlGoogle,
};