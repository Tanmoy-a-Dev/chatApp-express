// external import
const router = require('express').Router();

// internal imports
const { getUsers, addUser } = require('../controllers/usersController');
const avatarUpload = require('../middlewares/users/avatarUpload');
const {addUserValidator, addUserValidationHandler} = require('../middlewares/users/userValidators');

// show the user page
router.get('/', getUsers);
// posting the form data
router.post('/', avatarUpload, addUserValidator, addUserValidationHandler, addUser);



module.exports = router;
