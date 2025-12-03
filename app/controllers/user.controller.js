// Import necessary modules
const User = require('../models/user.model');
const logger = require('../config/logger');

// Create a new user
exports.createUser = (req, res) => {
    // Validation logic can be extracted for better structure
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    user.save()
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            logger.error('Error creating user: ', err);
            res.status(500).send({ message: err.message || 'Some error occurred while creating the user.' });
        });
};

// Update user details
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    User.findByIdAndUpdate(userId, updateData, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            logger.error('Error updating user: ', err);
            res.status(500).send({ message: 'Cannot update user' });
        });
};

// Delete user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndRemove(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully!' });
        })
        .catch(err => {
            logger.error('Error deleting user: ', err);
            res.status(500).send({ message: 'Could not delete user' });
        });
};
