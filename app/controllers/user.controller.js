// Import necessary modules and dependencies
const User = require('../models/user.model');
const logger = require('../utils/logger');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    // Basic validation step
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required.' });
    }
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        logger.error('Error creating user: ', error);
        res.status(500).send({ message: 'An error occurred while creating the user.' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        logger.error('Error fetching users: ', error);
        res.status(500).send({ message: 'An error occurred while fetching users.' });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    // Basic validation step
    if (!name && !email) {
        return res.status(400).send({ message: 'At least one of name or email must be provided.' });
    }
    try {
        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        logger.error('Error updating user: ', error);
        res.status(500).send({ message: 'An error occurred while updating the user.' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting user: ', error);
        res.status(500).send({ message: 'An error occurred while deleting the user.' });
    }
};