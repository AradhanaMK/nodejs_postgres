const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Route for retrieving a list of users
router.get('/users', userController.listUsers);

// Route for creating a new user
router.post('/users', userController.createUser);

// Route for retrieving a specific user by ID
router.get('/users/:id', userController.getUserById);

// Route for updating an existing user
router.put('/users/:id', userController.updateUser);

// Route for deleting a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;