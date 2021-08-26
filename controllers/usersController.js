// external imports
const bcrypt = require('bcrypt');
const People = require('../models/People');
const path = require('path');
const { unlink } = require('fs');

// get users
async function getUsers(req, res, next) {
    // const users = await People.find();
    // res.render("users", {
    //     title: "Users Page"
    // })

    try {
        const users = await People.find();
        res.render("users", {
            title: "Users Page",
            users
        })
    }
    catch (err) {
        
    }
}

// add user
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // creating a new user
    if (req.files && req.files.length > 0) {
        newUser = new People({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword
        });
    }
    else {
        newUser = new People({
            ...req.body,
            password: hashedPassword
          }
        )
    }
    // saving newly created user
    try {
        const result = await newUser.save();

        res.status(200).json({
            message: "New user added successfully"
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

// remove user
async function removeUser(req, res, next) {

    try {
    const user = await People.findByIdAndDelete({
        _id: req.params.id
    });

    // remove avatar or profile pic
        if (user.avatar) {
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
                (err) => console.log(err)
            );
        };

        // give response
        res.status(200).json({
            message: "User was deleted successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Couldn't delete the user!"
                }
            }
        });
    }
}

module.exports = {
    getUsers,
    addUser,
    removeUser
}