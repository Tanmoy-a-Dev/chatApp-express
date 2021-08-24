// internal imports
const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        5000000,
        "Only jpeg, jpg or png format supported!"
    );

    // call the middleware function for uploading image
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message
                    }
                },
            });
        }
        else {
            next();
        }
    });
}

module.exports = avatarUpload;