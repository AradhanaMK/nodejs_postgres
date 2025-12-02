// Import necessary modules and middleware
const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/user.controller');
const { validateLogin } = require('../middleware/validation');

// ========================
// User Authentication Routes
// ========================

/**
 * @route POST /login
 * @desc Log in a user
 * @access Public
 */
router.post('/login', validateLogin, verifyUser);

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', registerUser);

// Other user routes...

module.exports = router;
