const { spawn } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

async function ensureDirectoryExists(directoryPath) {
  try {
    await fs.access(directoryPath, fs.constants.F_OK);
    console.log("Directory already exists:", directoryPath);
  } catch (error) {
    console.log("Directory does not exist, creating:", directoryPath);
    await fs.mkdir(directoryPath, { recursive: true });
    console.log("Directory created:", directoryPath);
  }
}

exports.handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadsDir = path.join(__dirname, "../uploads");
  const outputsDir = path.join(__dirname, "../outputs");

  // Ensure both directories exist
  await ensureDirectoryExists(uploadsDir);
  await ensureDirectoryExists(outputsDir);

  // Define file paths
  const inputFilePath = path.join(uploadsDir, req.file.filename);
  const outputFileName = `${path.parse(req.file.filename).name}.json`;
  const outputFilePath = path.join(outputsDir, outputFileName);

  const pythonProcess = spawn("python3", [
    "./pyspark/top_ten_words_and_counts.py",
    inputFilePath,
    outputFilePath,
  ]);

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    res.send({ message: "File processed successfully", code: code });
  });

  // pythonProcess.on("close", async (code) => {
  //   console.log("Read file data:");
  //   if (code !== 0) {
  //     console.error(`Python script exited with code ${code}`);
  //     return res.status(500).send("Failed to process the file.");
  //   }
  //   // Attempt file read after a delay to avoid timing issues
  //   setTimeout(async () => {
  //     try {
  //       const fileData = await fs.readFile(outputFilePath);
  //       console.log(fileData);
  //       const parsedResult = JSON.parse(fileData);
  //       res.send({
  //         message: "File processed successfully",
  //         result: parsedResult,
  //       });
  //     } catch (error) {
  //       console.error("Error reading or parsing output file:", error);
  //       res.status(500).send("Error handling the output file.");
  //     }
  //   }, 10000); // Delay of 1000ms (1 second)
  // });
};
