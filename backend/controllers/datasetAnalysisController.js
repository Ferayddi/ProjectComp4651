const datasetAnalysis = async (req, res) =>{
    try{
        const {dataset_name, analysis_type} = req.body;

        console.log(dataset_name, " ", analysis_type,)

        //Perform the analysis and send back the results


        return res.status(200).json({ status: 200 });

    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
}

module.exports = {
    datasetAnalysis
};