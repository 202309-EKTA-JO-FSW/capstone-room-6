const multer = require('multer');
const fs = require('fs');
const path = require('path');

const destinationDirectory = path.join(__dirname, '../uploads')

if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
