const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Create a new user
router.post('/users', userController.createUser);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

// Assign role to a user
router.put('/users/:id/assign-role', userController.assignRole);

module.exports = router;