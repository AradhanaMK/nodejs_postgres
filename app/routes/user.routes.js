var router = require('express').Router();
const userController = require('../controllers/user.controller.js');
const { body, validationResult } = require('express-validator');

// Middleware for async error handling
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware for validation
const validateUser = [
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty()
];

// Middleware for role assignment validation
const validateRoleAssignment = [
  body('role').isString().notEmpty()
];

// Middleware for error tracking
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

// Retrieve all Users, returns an array of user objects
router.get('/users', asyncHandler(userController.getAllUsers));

// Retrieve a single User by id, returns a user object if found
router.get('/users/:id', asyncHandler(userController.getUserById));

// Create a new User, expects user attributes in request body
router.post('/users', validateUser, asyncHandler(userController.createUser));

// Update an existing User by id, expects user attributes in request body
router.put('/users/:id', asyncHandler(userController.updateUser));

// Delete a User by id
router.delete('/users/:id', asyncHandler(userController.deleteUser));

// Login a User, expects username and password in request body
router.post('/users/login', validateUser, asyncHandler(userController.verifyUser));

// Assign role to a User by id, expects role information in request body
router.post('/users/:id/role/assign', validateRoleAssignment, asyncHandler(userController.roleAssign));

// Use error handling middleware
router.use(errorHandler);

// End of user routes

module.exports = router;