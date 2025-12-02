// app/controllers/user.controller.js

const User = require('../models/User');
const Role = require('../models/Role');

// Common error handling function
const handleError = (res, error, userId, roleId) => {
    console.error(`Error for UserId: ${userId}, RoleId: ${roleId}`, error);
    return res.status(500).json({
        message: 'An error occurred during the role assignment.',
        userId: userId,
        roleId: roleId,
        error: error.message
    });
};

exports.assignRole = async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        user.role = roleId;
        await user.save();

        return res.status(200).json({ message: 'Role assigned successfully', userId, roleId });
    } catch (error) {
        return handleError(res, error, userId, roleId);
    }
};
