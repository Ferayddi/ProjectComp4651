
const { spawn } = require('child_process');

/**
 * Format of crawlReddit script: py crawlingcode.py reddit_crawl "beagles" 10 1
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const crawlReddit = async (req, res) =>{
    try{
        const {search_query, num_posts, datasetName} = req.body;

        console.log(search_query, " ", num_posts, " ", datasetName)

        //invoke crawl programme to crawl reddit posts here
        //after programme done, it should generate a text file under the upload folder
        //and store the path/url of the dataset to the DB
        const pythonProcess = spawn('python', ['../python_crawl_files/crawlingcode.py', 'reddit_crawl', search_query, num_posts, 1]);
        
        let pythonOutput = '';
        // Log output of the Python script
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script output: ${data}`);
            pythonOutput += data;
        });

        // Handle errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
        });

        // Handle Python script process exit
        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            
            // The pythonOutput variable now contains the entire text! Store it in the database


            // You can send a response to the client here
            res.send(`Python script exited with code ${code}`);
        });


        return res.status(200).json({ status: 200 });

    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}

const crawlGoogle = async (req, res) =>{
    try{
        const {search_query, num_links, dataset_name} = req.body;

        console.log(search_query, " ", num_links, " ", dataset_name)

        const pythonProcess = spawn('python', ['../python_crawl_files/crawlingcode.py', 'google_crawl', search_query, num_links, 1]);
        
        let pythonOutput = '';
        // Log output of the Python script
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script output: ${data}`);
            pythonOutput += data;
        });

        // Handle errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
        });

        // Handle Python script process exit
        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            
            // The pythonOutput variable now contains the entire text! Store it in the database

            // You can send a response to the client here
            res.send(`Python script exited with code ${code}`);
        });


        return res.status(200).json({ status: 200 });
    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}

module.exports = {
    crawlReddit,
    crawlGoogle,
};