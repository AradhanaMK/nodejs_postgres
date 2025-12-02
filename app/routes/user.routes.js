var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Retrieve all Users, returns an array of user objects
router.get('/users', userController.getAllUsers);

// Retrieve a single User by id, returns a user object if found
router.get('/users/:id', userController.getUserById);

// Create a new User, expects user attributes in request body
router.post('/users', userController.createUser);

// Update a User with id
router.put('/users/:id', userController.updateUser);

// Delete a User by id
router.delete('/users/:id', userController.deleteUser);

// Login a User, expects username and password in request body
router.post('/users/login', userController.verifyUser);

// Assign role to a User by id, expects role information in request body
router.post('/users/:id/role/assign', userController.roleAssign);

// End of user routes

module.exports = router;