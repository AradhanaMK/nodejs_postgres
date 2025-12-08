
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// List all users
router.get('/users', userController.listUsers);
// Create a new user
router.post('/users/create', userController.createUser);
// Update an existing user
router.put('/users/update/:id', userController.updateUser);
// Delete a user
router.delete('/users/:id/delete', userController.deleteUser);

module.exports = router;
