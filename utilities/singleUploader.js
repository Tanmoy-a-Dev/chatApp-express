// external imports
const multer = require("multer");
const path = require("path");
const createError = require('http-errors')


function uploader(
    subfolder_path,
    allowed_file_types,
    max_size,
    error_messages
) {
    // 1.file uploads folder
    const uploads_folder = `${__dirname}/../public/uploads/${subfolder_path}`; 

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploads_folder);
        },
        filename: (req, file, cb) => {
            // gathering file extension name
            const fileExt = path.extname(file.originalname);

            // making a unique file name
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-")
                + ("-")
                + Date.now();
            
            cb(null, fileName + fileExt);
        }
    });

    // upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_size
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(createError(error_messages))
            }
        }
    })


    return upload;
}

module.exports = uploader;