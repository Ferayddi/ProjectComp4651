const fs = require("fs").promises;
const fs2 = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");

async function writeToFile(filePath, textString) {
  try {
    await fs.writeFile(filePath, textString);
    console.log("File has been saved successfully.");
  } catch (err) {
    console.error(`Error writing file: ${err.message}`);
  }
}

async function ensureDirectoryExists(filePath) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    console.log(`Directory created or already exists for ${filePath}`);
  } catch (err) {
    console.error(`Error creating directory for ${filePath}: ${err}`);
    throw err;
  }
}

function removeEmptyObjects(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      removeEmptyObjects(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  });
}

function runPythonScript(scriptPath, filePath, outputPath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [scriptPath, filePath, outputPath]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error("Failed to process the file."));
      } else {
        // Check if file has content or exists to ensure completion
        fs2.readFile(outputPath, "utf8", (err, data) => {
          if (err) {
            reject(new Error("Failed to read output file."));
          } else {
            console.log("Success to read the output file.");
            resolve(outputPath); // Resolve with the output path
          }
        });
      }
    });
  });
}

const quickresult = async (req, res) => {
  //try {
  const { textString } = req.body;
  if (!textString) {
    return res.status(400).json({ status: 400, error: "No text provided" });
  }

  const uniqueId = uuidv4();
  const uniqueInputFilename = `${uniqueId}.txt`;
  const filePath = path.join("uploads", uniqueInputFilename);
  const outputFilePath1 = `outputs/ner_analysis/${uniqueId}.json`;
  const outputFilePath2 = `outputs/word_analysis/${uniqueId}.json`;
  const outputFilePath3 = `outputs/sentiment_analysis/${uniqueId}.json`;
  //const finalOutputFilePath = `outputs/quicktry/${uniqueId}.txt`;

  writeToFile(filePath, textString);
  try {
    await ensureDirectoryExists(outputFilePath1);
    await fs.writeFile(outputFilePath1, "", "utf8");
    console.log(`Successfully create file ${outputFilePath1}`);
  } catch (err) {
    console.error(`Failed to create file ${outputFilePath1}: ${err}`);
  }
  try {
    await ensureDirectoryExists(outputFilePath2);
    await fs.writeFile(outputFilePath2, "", "utf8");
    console.log(`Successfully create file ${outputFilePath2}`);
  } catch (err) {
    console.error(`Failed to create file ${outputFilePath2}: ${err}`);
  }
  try {
    await ensureDirectoryExists(outputFilePath3);
    await fs.writeFile(outputFilePath3, "", "utf8");
    console.log(`Successfully create file ${outputFilePath3}`);
  } catch (err) {
    console.error(`Failed to create file ${outputFilePath3}: ${err}`);
  }
  // try {
  //   await ensureDirectoryExists(finalOutputFilePath);
  //   await fs.writeFile(finalOutputFilePath, "", "utf8");
  //   console.log(`Successfully create file ${finalOutputFilePath}`);
  // } catch (err) {
  //   console.error(`Failed to create file ${finalOutputFilePath}: ${err}`);
  // }

  // runPythonScript("pyspark/NER_Analysis.py", filePath, outputFilePath1),
  //   runPythonScript("pyspark/word_Analysis.py", filePath, outputFilePath2),
  //   runPythonScript(
  //     "pyspark/sentiment_analysis.py",
  //     filePath,
  //     outputFilePath3
  //   );

  const outputPaths = await Promise.all([
    runPythonScript("pyspark/NER_Analysis.py", filePath, outputFilePath1),
    runPythonScript("pyspark/word_Analysis.py", filePath, outputFilePath2),
    runPythonScript("pyspark/sentiment_analysis.py", filePath, outputFilePath3),
  ]);

  //await writeToFile(finalOutputFilePath, JSON.stringify(results));
  return res.status(200).json({
    status: 200,
    output_url: outputPaths,
  });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }

  // try {
  //   const { textString } = req.body;
  //   console.log(textString);
  //   if (!textString) {
  //     return res.status(400).json({ status: 400, error: "No text provided" });
  //   }

  //   const uniqueId = uuidv4();
  //   const uniqueInputFilename = `${uniqueId}.txt`;
  //   const uniqueOutputFilename = `${uniqueId}.json`;
  //   const filePath = path.join("uploads", uniqueInputFilename);
  //   const outputPath = path.join("uploads", uniqueOutputFilename);

  //   try {
  //     fs.writeFileSync(filePath, textString);
  //     console.log("File has been saved successfully.");
  //   } catch (err) {
  //     console.error(`Error writing file: ${err.message}`);
  //   }

  //   console.log(filePath);
  //   console.log(outputPath);
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
  //       fs.readFile(outputPath, "utf8", (err, data) => {
  //         if (err) {
  //           console.error("Error reading the file:", err);
  //           res.status(500).json({ message: "Failed to read the file." });
  //         } else {
  //           const jsonData = JSON.parse(data);
  //           removeEmptyObjects(jsonData);
  //           res.json({
  //             message: "File processed successfully",
  //             result: jsonData,
  //           });
  //         }
  //       });
  //     }
  //   });
  // } catch (error) {
  //   if (!res.headersSent) {
  //     if (error.code)
  //       return res
  //         .status(error.code)
  //         .json({ status: error.code, error: error.error });
  //     return res
  //       .status(500)
  //       .json({ status: 500, error: "Internal Server Error" });
  //   }
  // }
};

module.exports = {
  quickresult,
};
