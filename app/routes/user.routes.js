const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Create a new user
router.post('/users', userController.createUser);

// Retrieve all users
router.get('/users', userController.getAllUsers);

// Retrieve a single user by id
router.get('/users/:id', userController.getUserById);

// Update a user by id
router.put('/users/:id', userController.updateUser);

// Delete a user by id
router.delete('/users/:id', userController.deleteUser);

module.exports = router;