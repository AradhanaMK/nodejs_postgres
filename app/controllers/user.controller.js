// User Controller

const User = require('../models/user.model');
const logger = require('../utils/logger');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
        logger.info('User created successfully:', user);
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(400).send({ message: 'Error creating user', error });
    }
};

// Get a user by ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
        logger.info('Retrieved user:', user);
    } catch (error) {
        logger.error('Error retrieving user:', error);
        res.status(500).send({ message: 'Error retrieving user', error });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
        logger.info('Deleted user:', user);
    } catch (error) {
        logger.error('Error deleting user:', error);
        res.status(500).send({ message: 'Error deleting user', error });
    }
};