var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Retrieve all Users, returns an array of user objects.
router.get('/users', userController.getAllUsers);

// Retrieve a single User by id, returns a user object if found. Check for valid user ID format.
router.get('/users/:id', userController.getUserById);

// Create a new User, expects user attributes in request body. Validate attributes before creation.
router.post('/users', userController.createUser);

// Update an existing User by id, expects user attributes in request body. Ensure the user ID exists before updating.
router.put('/users/:id', userController.updateUser);

// Delete a User by id. Verify the user exists prior to deletion.
router.delete('/users/:id', userController.deleteUser);

// Login a User, expects username and password in request body. Implement error handling for failed login attempts.
router.post('/users/login', userController.verifyUser);

// Assign role to a User by id, expects role information in request body. Validate role information before assignment.
router.post('/users/:id/role/assign', userController.roleAssign);

// End of user routes

module.exports = router;