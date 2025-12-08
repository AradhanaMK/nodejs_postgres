app/controllers/user.controller.js

// Import necessary services and validation functions
const userService = require('../services/user.service');
const { validateCreateUser, validateUpdateUser } = require('../validators/user.validator');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const validationErrors = validateCreateUser(req.body);
        if (validationErrors) {
            return res.status(400).json({ message: `Validation errors: ${validationErrors}` });
        }
        const newUser = await userService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
};

// Verify user
exports.verifyUser = async (req, res) => {
    try {
        const user = await userService.verifyUser(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ message: 'An error occurred while verifying the user.' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const validationErrors = validateUpdateUser(req.body);
        if (validationErrors) {
            return res.status(400).json({ message: `Validation errors: ${validationErrors}` });
        }
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'An error occurred while updating the user.' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};