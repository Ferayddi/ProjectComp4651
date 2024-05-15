
const crawlReddit = async (req, res) =>{
    try{
        const {searchType, numPosts, datasetName} = req.body;

        console.log(searchType, " ", numPosts, " ", datasetName)

        //invoke crawl programme to crawl reddit posts here
        //after programme done, it should generate a text file under the upload folder
        //and store the path/url of the dataset to the DB

        return res.status(200).json({ status: 200 });

    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}

const crawlGoogle = async (req, res) =>{
    try{
        const {searchType, numLinks, datasetName} = req.body;

        console.log(searchType, " ", numLinks, " ", datasetName)

        //invoke crawl programme to crawl google here


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