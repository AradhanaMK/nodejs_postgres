var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Retrieve all Users
router.get('/users', userController.getAllUsers);

// Retrieve a single User with id
router.get('/users/:id', userController.getUserById);

// Create a new User
router.post('/users', userController.createUser);

// Update a User with id
router.put('/users/:id', userController.updateUser);

// Delete a User with id
router.delete('/users/:id', userController.deleteUser);

// Login a User
router.post('/users/login', userController.verifyUser);

// Assign role to a User
router.post('/users/:id/role/assign', userController.roleAssign);

module.exports = router;
