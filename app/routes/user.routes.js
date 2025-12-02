var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Retrieve all Users, returns an array of user objects
router.get('/users', getAllUsers);

// Retrieve a single User by id, returns a user object if found
router.get('/users/:id', getUserById);

// Create a new User, expects user attributes in request body
router.post('/users', createUser);

// Update an existing User by id, expects updated user attributes in request body
router.put('/users/:id', updateUser);

// Delete a User by id
router.delete('/users/:id', deleteUser);

// Login a User, expects username and password in request body
router.post('/users/login', verifyUser);

// Assign role to a User by id, expects role information in request body
router.post('/users/:id/role/assign', roleAssign);

// Route handlers
function getAllUsers(req, res) {
  return userController.getAllUsers(req, res);
}

function getUserById(req, res) {
  return userController.getUserById(req, res);
}

function createUser(req, res) {
  return userController.createUser(req, res);
}

function updateUser(req, res) {
  return userController.updateUser(req, res);
}

function deleteUser(req, res) {
  return userController.deleteUser(req, res);
}

function verifyUser(req, res) {
  return userController.verifyUser(req, res);
}

function roleAssign(req, res) {
  return userController.roleAssign(req, res);
}

// End of user routes

module.exports = router;
