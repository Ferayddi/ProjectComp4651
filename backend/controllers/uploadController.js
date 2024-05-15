const { spawn } = require("child_process");
const path = require("path");

exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = path.join(__dirname, "../uploads", req.file.filename);

  const pythonProcess = spawn("python", ["./pyspark/spark_test.py", filePath]);
  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`cstderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).send("Failed to process the file.");
    }
    res.send({ message: "File processed successfully", result: result.trim() });
  });
};
