// external import
const router = require('express').Router();

// internal imports
const { getUsers } = require('../controllers/usersController');

router.get('/', getUsers);

module.exports = router;
