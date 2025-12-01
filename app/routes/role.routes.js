var router = require("express").Router();
const roleController = require("../controllers/role.controller.js");

// Create a new Role
router.post("/create", roleController.createRole,
    // #swagger.summary = 'Create a Role'
);

// Update a Role with id
router.put("/update", roleController.updateRole,
    // #swagger.summary = 'Update a Role'
);

// Delete a Role with id
//router.delete("/:id/delete", roleController.deleteRoleById);

// Retrieve all Roles
router.get("/list", roleController.getAllRoles,
    // #swagger.summary = 'Get all the roles'
);

// Retrieve a single Role with id
router.get("/:id/get", roleController.getRoleById,
    // #swagger.summary = 'Get a role by Id'
    /* #swagger.security = [{
               "OAuth2": [
                   'read', 
                   'write'
               ]
        }] */
);

// Delete all Roles
//router.delete("/deleteall", roleController.deleteAllRole);

module.exports = router;