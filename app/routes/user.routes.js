// Import necessary modules
const express = require('express');
const router = express.Router();

// Import controller methods
const userController = require('../controllers/userController');

// Route for getting all users
router.get('/users', async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
});

// Route for creating a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await userController.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

// Route for getting a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await userController.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});

// Route for updating a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
});

// Route for deleting a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await userController.deleteUser(req.params.id);
        if (deletedUser) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;