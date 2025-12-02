var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Middleware for async error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Error response function for consistent error messages
const errorResponse = (res, statusCode, message, error) => {
  res.status(statusCode).json({ message, error: error.message });
};

// Retrieve all Users, returns an array of user objects
router.get('/users', asyncHandler(async (req, res) => {
  const users = await userController.getAllUsers();
  res.json(users);
}));

// Retrieve a single User by id, returns a user object if found
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await userController.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
}));

// Create a new User, expects user attributes in request body
router.post('/users', asyncHandler(async (req, res) => {
  const newUser = await userController.createUser(req.body);
  res.status(201).json(newUser);
}));

// Update an existing User by id, expects updated user attributes in request body
router.put('/users/:id', asyncHandler(async (req, res) => {
  const updatedUser = await userController.updateUser(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(updatedUser);
}));

// Delete a User by id
router.delete('/users/:id', asyncHandler(async (req, res) => {
  await userController.deleteUser(req.params.id);
  res.status(204).send();
}));

// Login a User, expects username and password in request body
router.post('/users/login', asyncHandler(async (req, res) => {
  const token = await userController.verifyUser(req.body);
  res.json({ token });
}));

// Assign role to a User by id, expects role information in request body
router.post('/users/:id/role/assign', asyncHandler(async (req, res) => {
  const updatedRole = await userController.roleAssign(req.params.id, req.body);
  res.json(updatedRole);
}));

// Error handling middleware
router.use((err, req, res, next) => {
  if (err && err.status) {
    errorResponse(res, err.status, 'Error processing request', err);
  } else {
    errorResponse(res, 500, 'Internal Server Error', err);
  }
});

// End of user routes

module.exports = router;
