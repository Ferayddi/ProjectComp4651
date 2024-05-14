
const quickresult = async (req, res) => {
    try {
        const { textString } = req.body;


        res.json({ result: "Processed result" });
    } catch (error) {
        if (error.code) return res.status(error.code).json({ status: error.code, error: error.error });
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};

module.exports = {
    quickresult
};