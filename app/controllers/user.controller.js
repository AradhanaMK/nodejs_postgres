// Assuming the rest of the file content is above this line

// Error handling for user not found scenario
if (!user) {
    const errorMessage = `User with ID ${userId} not found.`; // included user ID in the error message
    return res.status(404).json({ message: errorMessage }); // added semicolon for consistency
}

// The rest of the file content continues...
