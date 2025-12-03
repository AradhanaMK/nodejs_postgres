// User Controller

const User = require('../models/user.model');
const { handleError } = require('../utils/errorHandler');

const updateUser = async (req, res) => {
    try {
        const { id, userData } = req.body;

        // Validate input
        if (!id || !userData) {
            return res.status(400).json({ message: 'Invalid input: user ID and data are required.' });
        }

        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        // Improved error handling to be more descriptive
        handleError(res, error, 'An error occurred while updating the user.');
    }
};

module.exports = { updateUser };