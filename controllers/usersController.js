// external imports
const bcrypt = require('bcrypt');
const { find } = require('../models/People');

// get users
function getUsers(req, res, next) {
    res.render("users", {
        title: "Users Page"
    })
}

// add user
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // creating a new user
    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword
        });
    }
    else {
        newUser = new User({
            ...req.body,
            password: hashedPassword
        })
    }
    // saving newly created user
    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            message: "New user added successfully";
        })
    }
    catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occured"
                }
            }
        });
    };
}

module.exports = {
    getUsers,
    addUser
}