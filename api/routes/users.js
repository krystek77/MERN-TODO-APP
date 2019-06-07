const express = require('express');
const router = express.Router();

//User controller
const UserController = require('../controllers/user');

// @route 	POST users/signup
// @desc 	Register new user
// @access 	Public

router.post('/signup', UserController.signUp);

module.exports = router;
