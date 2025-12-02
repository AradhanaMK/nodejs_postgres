var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

// Retrieve all Users, returns an array of user objects
router.get('/users', async (req, res) => {
  try {
    const users = await userController.getAllUsers(req, res);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
});

// Retrieve a single User by id, returns a user object if found
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userController.getUserById(req, res);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
});

// Create a new User, expects user attributes in request body
router.post('/users', async (req, res) => {
  try {
    const newUser = await userController.createUser(req, res);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// Update an existing User by id, expects updated user attributes in request body
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await userController.updateUser(req, res);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// Delete a User by id
router.delete('/users/:id', async (req, res) => {
  try {
    await userController.deleteUser(req, res);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Login a User, expects username and password in request body
router.post('/users/login', async (req, res) => {
  try {
    const token = await userController.verifyUser(req, res);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error: error.message });
  }
});

// Assign role to a User by id, expects role information in request body
router.post('/users/:id/role/assign', async (req, res) => {
  try {
    const updatedRole = await userController.roleAssign(req, res);
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: 'Error assigning role', error: error.message });
  }
});

// End of user routes

module.exports = router;