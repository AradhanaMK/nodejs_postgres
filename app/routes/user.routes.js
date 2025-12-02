var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Async error handling middleware
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Retrieve all Users, returns an array of user objects
router.get('/users', asyncHandler(userController.getAllUsers));

// Retrieve a single User by id, returns a user object if found
router.get('/users/:id', asyncHandler(userController.getUserById));

// Create a new User, expects user attributes in request body
router.post('/users', asyncHandler(userController.createUser));

// Update an existing User by id, expects user attributes in request body
router.put('/users/:id', asyncHandler(userController.updateUser));

// Delete a User by id
router.delete('/users/:id', asyncHandler(userController.deleteUser));

// Login a User, expects username and password in request body
router.post('/users/login', asyncHandler(userController.verifyUser));

// Assign role to a User by id, expects role information in request body
router.post('/users/:id/role/assign', asyncHandler(userController.roleAssign));

// End of user routes

module.exports = router;