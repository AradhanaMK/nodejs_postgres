// Import necessary modules
const User = require('../models/user.model.js');

/**
 * Update a User.
 *
 * This function updates an existing user in the database with the provided user ID and new data.
 *
 * @param {string} id - The ID of the user to be updated.
 * @param {object} userData - The data to update the user with.
 * @returns {Promise<object>} The updated user object.
 */
const updateUser = async (id, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

module.exports = { updateUser };