const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Create a new user
router.post('/create', userController.createUser); // Added closing parenthesis

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user by ID
router.put('/:id', userController.updateUserById);

// Delete user by ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;