const multer = require('multer')
const fs = require('fs')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationDir = `uploads/${req.body.userName}/uploadByUser`;
        fs.mkdirSync(destinationDir, { recursive: true });
        cb(null, destinationDir);
    },
    filename: function (req, file, cb) {
        const originalFilename = file.originalname;
        cb(null, originalFilename);
    }
});


let upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype === 'text/plain') {
            callback(null, true);
        } else {
            console.log('File format not allowed');
            callback(null, false);
        }
    }
});

module.exports = upload