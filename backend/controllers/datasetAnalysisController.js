const { spawn } = require("child_process");
const fs = require("fs").promises;
const fs2 = require("fs");
const path = require("path");
async function ensureDirectoryExists(filePath) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    console.log(`Directory created or already exists for ${filePath}`);
  } catch (err) {
    console.error(`Error creating directory for ${filePath}: ${err}`);
    throw err;
  }
}

const datasetAnalysis = async (req, res) => {
  try {
    const { dataset_name, analysis_type } = req.body;
    const datasetname = path.parse(dataset_name.datasetName).name;
    console.log(datasetname, " ", analysis_type);
    let scriptPath;
    const outputFilePath = `outputs/${analysis_type}/${datasetname}.txt`;
    try {
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
    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      console.log("Analysis result file created at:", outputFilePath);

      // Check if the file exists
      fs2.access(outputFilePath, fs2.constants.F_OK, (err) => {
        if (err) {
          console.error("Error accessing file:", err);
          return res.status(404).send("File not found");
        }
        return res
          .status(200)
          .json({ status: 200, output_url: outputFilePath });

        // const fileStream = fs2.createReadStream(outputFilePath);
        // res.setHeader("Content-Type", "text/plain");
        // res.setHeader(
        //   "Content-Disposition",
        //   `attachment; filename="${path.basename(outputFilePath)}"`
        // );
        // fileStream.on("open", (fd) => {
        //   console.log(
        //     `File Stream opened successfully with file descriptor: ${fd}`
        //   );
        // });

        // fileStream.on("error", (error) => {
        //   console.error("Error during file read:", error);
        // });

        // fileStream.on("data", (chunk) => {
        //   console.log(`Received ${chunk.length} bytes of data.`);
        // });

        // fileStream.on("end", () => {
        //   console.log("No more data to read.");
        // });

        // fileStream.on("close", () => {
        //   console.log("Stream has been closed.");
        // });
        // //res.writeHead(200, head);

        // fileStream.pipe(res).on("finish", () => {
        //   console.log("File has been successfully sent.");
        // });
      });
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
