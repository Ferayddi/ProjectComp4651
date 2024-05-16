const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");
async function ensureDirectoryExists(filePath) {
  try {
    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    console.log(`Directory created or already exists for ${filePath}`);
  } catch (err) {
    console.error(`Error creating directory for ${filePath}: ${err}`);
    throw err; // Re-throw the error for calling function to handle
  }
}

const datasetAnalysis = async (req, res) => {
  try {
    const { dataset_name, analysis_type } = req.body;
    const datasetname = path.parse(dataset_name.datasetName).name;
    console.log(datasetname, " ", analysis_type);
    let scriptPath;
    //const outputFilePath = `outputs/${req.userName}/${analysis_type}/${datasetname}.txt`;
    const outputFilePath = `outputs/${analysis_type}/${datasetname}.txt`;
    try {
      // Ensure the output directory exists
      await ensureDirectoryExists(outputFilePath);
      await fs.writeFile(outputFilePath, "", "utf8");
      console.log(`Successfully create file ${outputFilePath}`);
    } catch (err) {
      console.error(`Failed to create file ${outputFilePath}: ${err}`);
    }

    switch (analysis_type) {
      case "Word count":
        scriptPath = path.join(__dirname, "../pyspark/word_Analysis.py");
        break;
      case "NER":
        scriptPath = path.join(__dirname, "../pyspark/NER_Analysis.py");
        break;
      case "Sentiment analysis":
        scriptPath = path.join(__dirname, "../pyspark/sentiment_analysis.py");
        break;
      default:
        return res
          .status(400)
          .json({ status: 400, error: "Invalid analysis type" });
    }

    const pythonProcess = spawn("python", [
      scriptPath,
      dataset_name.datasetUrl,
      outputFilePath,
    ]);

    pythonProcess.stdout.on("data", (data) => {});

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
    });

    pythonProcess.on("close", async (code) => {
      console.log(`Python script exited with code ${code}`);
      console.log("Analysis result file created.");
      fs.access(outputFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("Error accessing file:", err);
          return res.status(404).send("File not found");
        }
        res.set({
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="${path.basename(
            outputFilePath
          )}"`,
        });

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on("error", (error) => {
          console.error("Error reading file:", error);
          res.status(500).send("Error reading file");
        });
      });
      return res.status(200).json({ status: 200 });
    });
  } catch (error) {
    if (error.code)
      return res
        .status(error.code)
        .json({ status: error.code, error: error.error });
    return res
      .status(500)
      .json({ status: 500, error: "Internal Server Error" });
  }
};

module.exports = {
  datasetAnalysis,
};
