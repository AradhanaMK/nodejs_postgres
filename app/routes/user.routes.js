var router = require('express').Router();
const userController = require('../controllers/user.controller.js');
const { validateUserId, validateUserAttributes, validateRoleAssignment } = require('../middlewares/validation.middleware.js');

// Retrieve all Users, returns an array of user objects.
router.get('/users', userController.getAllUsers);

// Retrieve a single User by id, returns a user object if found.
router.get('/users/:id', validateUserId, userController.getUserById);

// Create a new User, expects user attributes in request body.
router.post('/users', validateUserAttributes, userController.createUser);

// Update an existing User by id, expects user attributes in request body.
router.put('/users/:id', validateUserId, validateUserAttributes, userController.updateUser);

// Delete a User by id.
router.delete('/users/:id', validateUserId, userController.deleteUser);

// Login a User, expects username and password in request body.
router.post('/users/login', userController.verifyUser);

// Assign role to a User by id, expects role information in request body.
router.post('/users/:id/role/assign', validateUserId, validateRoleAssignment, userController.roleAssign);

// Custom error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    let responseMessage = { error: 'Internal Server Error' };

    if (statusCode === 400) {
        responseMessage.error = err.message || 'Bad Request';
    } else if (statusCode === 404) {
        responseMessage.error = err.message || 'Not Found';
    } else if (statusCode === 401) {
        responseMessage.error = err.message || 'Unauthorized';
    } else if (statusCode === 403) {
        responseMessage.error = err.message || 'Forbidden';
    }

    res.status(statusCode).send(responseMessage);
});

// End of user routes

module.exports = router;