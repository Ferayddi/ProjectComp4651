const express = require("express");
const { handleFileUpload } = require("../controllers/uploadController");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name, or create a new naming
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), handleFileUpload);

module.exports = router;
