const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const quickresult = async (req, res) => {
  try {
    const { textString } = req.body;
    console.log(textString);
    if (!textString) {
      return res.status(400).json({ status: 400, error: "No text provided" });
    }

    const uniqueId = uuidv4();
    const uniqueInputFilename = `${uniqueId}.txt`;
    const uniqueOutputFilename = `${uniqueId}.json`;
    const filePath = path.join("uploads", uniqueInputFilename);
    const outputPath = path.join("uploads", uniqueOutputFilename);

    try {
      fs.writeFileSync(filePath, textString);
      console.log("File has been saved successfully.");
    } catch (err) {
      console.error(`Error writing file: ${err.message}`);
    }

    console.log(filePath);
    console.log(outputPath);
    const pythonProcess = spawn("python", [
      "pyspark/NER_Analysis.py",
      filePath,
      outputPath,
    ]);

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete temporary input file:", err);
      });

      if (code !== 0) {
        return res
          .status(500)
          .json({ status: 500, error: "Failed to process the file." });
      }

      if (!res.headersSent) {
        fs.readFile(outputPath, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading the file:", err);
            res.status(500).json({ message: "Failed to read the file." });
          } else {
            const jsonData = JSON.parse(data);
            res.json({
              message: "File processed successfully",
              result: jsonData,
            });
          }
        });
      }
    });
    // fs.writeFile(filePath, textString, async (err) => {
    //   if (err) {
    //     console.error("Failed to write file:", err);
    //     return res
    //       .status(500)
    //       .json({ status: 500, error: "Failed to write data to file." });
    //   }
    //   console.log(filePath);
    //   const pythonProcess = spawn("python", [
    //     "pyspark/NER_Analysis.py",
    //     filePath,
    //     outputPath,
    //   ]);

    //   let result = "";
    //   pythonProcess.stdout.on("data", (data) => {
    //     result += data.toString();
    //   });

    //   pythonProcess.stderr.on("data", (data) => {
    //     console.error(`stderr: ${data}`);
    //   });

    //   pythonProcess.on("close", (code) => {
    //     fs.unlink(filePath, (err) => {
    //       if (err) console.error("Failed to delete temporary input file:", err);
    //     });

    //     if (code !== 0) {
    //       return res
    //         .status(500)
    //         .json({ status: 500, error: "Failed to process the file." });
    //     }

    //     if (!res.headersSent) {
    //       res.json({
    //         message: "File processed successfully",
    //         result: result.trim(),
    //       });
    //     }
    //   });
    // });
  } catch (error) {
    if (!res.headersSent) {
      if (error.code)
        return res
          .status(error.code)
          .json({ status: error.code, error: error.error });
      return res
        .status(500)
        .json({ status: 500, error: "Internal Server Error" });
    }
  }
};

module.exports = {
  quickresult,
};
