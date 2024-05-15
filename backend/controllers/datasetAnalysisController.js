const fs = require('fs');
const path = require('path');

const datasetAnalysis = async (req, res) =>{
    try{
        const {dataset_name, analysis_type} = req.body;

        console.log(dataset_name, " ", analysis_type,)

        //Perform the analysis and generate text file


        //File path of text file
        const filePath = path.join(__dirname, 'path', 'to', 'our', 'text', 'file.txt');

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('Error accessing file:', err);
                res.status(404).send('File not found');
                return;
            }
        
            // Set response headers
            res.set({
                'Content-Type': 'text/plain',
                'Content-Disposition': 'attachment; filename="file.txt"',
            });
        
            // Create a read stream to the file
            const fileStream = fs.createReadStream(filePath);
        
            // Pipe the file stream to the response
            fileStream.pipe(res);

            // Handle any errors that occur while reading the file
            fileStream.on('error', (error) => {
                console.error('Error reading file:', error);
                res.status(500).send('Error reading file');
            });
        });

        
        return res.status(200).json({ status: 200 });

    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}

module.exports = {
    datasetAnalysis
};