var router = require("express").Router();
const userController = require("../controllers/user.controller.js");

// Retrieve all Users
router.get("/list", userController.getAllUsers);

// Retrieve a single User with id
router.get("/:id/get", userController.getUserById);

// Create a new User    
router.post("/create", userController.createUser);

// Update a User with id
router.post("/update", userController.updateUser);

// Delete a User with id
router.delete("/:id/delete", userController.deleteUser);

// Login a new User    
router.post("/login", userController.verifyUser

//Role assign to a User
router.post("/:id/role/assign", userController.roleAssign


module.exports = router; 