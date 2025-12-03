const express = require('express');
const userController = require('../controllers/user.controller.js');

const router = express.Router();

// Route to create a user
router.post('/create', userController.createUser);

// Route to get a list of users
router.get('/list', userController.getUsers);

// Route to update a user
router.put('/update', userController.updateUser);

// Route to login a user
router.post('/login', userController.loginUser);

// Route to assign a role to a user
router.post('/roleAssign', userController.roleAssignUser);

module.exports = router;
