// user.controller.js

const userData = {
    id: null, // Changed Id to id for consistency
    name: '',
    email: '',
};

// Other existing code...

async function updateUser(req, res) {
    try {
        const { id, name, email } = req.body;
        if (!id) {
            throw new Error('User ID is required');
        }
        // Assuming we have a setUser function to handle the user update logic
        await setUser(id, { name, email });
        res.status(200).send({ message: 'User updated successfully.' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: `Failed to update user: ${error.message}` }); // More informative error message
    }
}

// Other existing code...