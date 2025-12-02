// Import necessary models
const User = require('../models/user.model');
const Role = require('../models/role.model');

// Other function declarations...

// Function to assign a role to a user
async function assignRoleToUser(req, res) {
    try {
        const userId = req.params.userId;
        const roleId = req.body.roleId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).send({ message: 'Role not found' });
        }

        user.roles.push(roleId);
        await user.save();

        return res.send({ message: 'Role assigned successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'An error occurred while assigning role', error: error.message });
    }
}

// Export functions for use in other files
module.exports = {
    // Other exports...
    assignRoleToUser
};