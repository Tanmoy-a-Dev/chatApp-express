// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const path = require('path');
const { unlink } = require('fs');
// internal imports
const User = require('../../models/People');


const addUserValidator = [
    // name validate
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    
    // email validate
    check("email")
        .isEmail()
        .withMessage("Email is not valid")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError("Email already in use");
                }
            
            }
            catch (err) {
                throw createError(err.message)
            }
        }),
    
    // mobile number validate
    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid bangladeshi mobile number")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });

                if (user) {
                    throw createError("Mobile number is already in use");
                }
            }
            catch (err) {
                throw createError(err.message);
            }
        }),
    
    // Password validate
    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be 8 characters long & must contain atleast 1 Lowercase, 1 Uppercase, 1 Number and 1 Symbol"
        )
      
];

// creating a middleware for handling validation errors
const addUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    // error(if) we will get
    /*

    --> error diagram
    mappedErrors = {
        name: {
            msg: "Name is required"
        },
        email: {
            msg: "Email is not valid"
        }
    }
    */
    
    // back to code
    if (Object.keys(mappedErrors) === 0) {
        next()
    }
    else {
        // if error we have to delete the file or image that had been uploaded
        // remove image or file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(`${__dirname}/public/uploads/avatars/${filename}`),
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            ); // unlink ended here
        }; // if block in else ended here

        // sending response with errors
        res.status(500).json({
            errors: mappedErrors
        })

    } // else ended here

} // addUserValidationHandler ended here

module.exports = {
    addUserValidator,
    addUserValidationHandler,
};