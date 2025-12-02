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

// Delete a User with id
router.delete("/:id/delete", userController.deleteUser);

router.post("/login", userController.verifyUser);

router.post("/:id/role/assign", userController.roleAssign);


module.exports = router;
