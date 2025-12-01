const {validateCreateRole, validateUpdateRole} = require('./validators/roleValidator');
const roleService = require('../services/role.service');
var logger = require("../utils/logger");


// Create a new Role
const createRole = async (req, res, next) => {
  const roleData = {
    name: req.body.name,
    description: req.body.description,
  };
  logger.info("Role -> Create API called.");
  logger.debug("createRole" + JSON.stringify(roleData));

  try {
    await validateCreateRole(roleData);
  } catch (error) {
    logger.log(error);
    const e = new Error('Invalid role data');
    e.status = 400;
    return next(e);
  }

  try {
    const role = await roleService.createRole(roleData);
    if (role) {
      res.status(200).json({
        'status': 'success',
        'role' : role,
      });
    } else {
      const error = new Error('Role already exists');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot create Role');
    return next(e);
  }
};

// Update a Role
const updateRole = async (req, res, next) => {
  const roleData = {
    Id: req.body.Id,
    name: req.body.name,
    description: req.body.description,
  };
  logger.info("Role -> Update API called.");
  logger.debug("updateRole" + JSON.stringify(roleData));

  try {
    await validateUpdateRole(roleData);
  } catch (error) {
    logger.log(error);
    const e = new Error('Invalid product data');
    e.status = 400;
    return next(e);
  }

  try {
    const role = await roleService.updateRole(roleData);
    if (role) {
      res.status(200).json({
        'status': 'success',        
      });
    } else {
      const error = new Error('Role already exists');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot create Role');
    return next(e);
  }
};

//Get all role data
const getAllRoles = async (req, res, next) => {
  logger.info("Role -> Get all roles API called.");
  try {
    const role = await roleService.getAllRoles();
    if (role) {
      res.status(200).json({
        'status': 'success',
        'roles': role,
      });
    }
    else {
      const error = new Error('No data available');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot find the role');
    return next(e);
  }
};

//Get a role By Id
const getRoleById = async (req, res, next) => {
  logger.info("Role -> Get by user id API called.");
  const Id = req.params.id;
  if (Id <= 0) {
    const error = new Error('Role Id can not be 0 or -Ve number');
    error.status = 400;
    return next(error);
  }

  try {
    const role = await roleService.getRoleById(Id);
    if (role) {
      res.status(200).json({
        'status': 'success',
        'role': role,
      });
    }
    else {
      const error = new Error('Cannot find user due to Invalid Id');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot find the user');
    return next(e);
  }
};

module.exports = {
  createRole,
  updateRole,
  getAllRoles,
  getRoleById,
};