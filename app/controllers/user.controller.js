const { validateCreateUser, validateUpdateUser } = require('./validators/userValidator');
const userService = require('../services/user.service');
var logger = require("../utils/logger");

//Create a User
const createUser = async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  logger.info("User -> Create API called.");
  logger.debug("createUser" + JSON.stringify(userData));

  try {
    await validateCreateUser(userData);
  } catch (error) {
    logger.log(error);
    const e = new Error('Invalid email or password');
    e.status = 400;
    return next(e);
  }

  try {
    const user = await userService.createUser(userData);
    if (user) {
      res.status(200).json({
        'status': 'success',
        'user' : user
      });
    } else {
      const error = new Error('User already exists');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot create user');
    return next(e);
  }
};


//Update a User
const updateUser = async (req, res, next) => {
  logger.info("User -> Update API called.");
  const userData = {
    Id: req.body.Id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  logger.info("updateUser" + JSON.stringify(userData));

  try {
    await validateUpdateUser(userData);
  } catch (error) {
    logger.warn(error);
    error.status = 400;
    return next(error);
  }

  try {
    const user = await userService.updateUser(userData);
    if (user) {
      res.status(200).json({
        'status': 'success',
      });
    }
    else {
      const error = new Error('Cannot update user due to Invalid Id');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot update user');
    return next(e);
  }
};

//Get a User By Id
const getUserById = async (req, res, next) => {
  logger.info("User -> Get by user id API called.");
  const Id = req.params.id;
  console.log(Id);
  if (Id <= 0) {
    const error = new Error('User Id can not be 0 or -Ve number');
    error.status = 400;
    return next(error);
  }

  try {
    const user = await userService.getUserById(Id);
    console.log(user);
    if (user) {
      res.status(200).json({
        'status': 'success',
        'user': user,
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

//Get all User
const getAllUsers = async (req, res, next) => {
  logger.info("User -> Get all user API called.");
  try {
    const user = await userService.getAllUsers();
    logger.info(user);
    if (user) {
      res.status(200).json({
        'status': 'success',
        'users': user,
      });
    }
    else {
      const error = new Error('No data available');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Cannot find the user');
    return next(e);
  }
};

//delete a User
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (id <= 0) {
    const error = new Error('User Id can not be 0 or -Ve number');
    error.status = 400;
    return next(error);
  }

  try {
    const user = await userService.deleteUser(id);
    console.log(user);
    if (user) {
      res.status(200).json({
        'status': 'success',
      });
    }
    else {
      const error = new Error('Cannot delete User with id=${id}. Maybe User was not found!');
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    const e = new Error('Could not delete User with id=' + id);
    return next(e);
  }
};


const verifyUser = async (req, res, next) => {
  //const userData = req.body;
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    await validate(userData);
  } catch (error) {
    const e = new Error('Wrong email or password');
    e.status = 400;
    return next(e);
  }

  try {
    const user = await userService.verifyUser(userData);
    if (user) {
      try {
        const token = await createToken({ email: userData.email, id: user._id });
        res.status(200).json({
          'status': 'success',
          'token': token,
        });
      } catch (error) {
        console.log(error);
        const e = new Error('Cannot create token');
        return next(e);
      }
    } else {
      const e = new Error('Wrong email or password');
      e.status = 400;
      return next(e);
    }
  } catch (error) {
    const e = new Error('Cannot verify user');
    return next(e);
  }
};

//Role assign to User
const roleAssign = async (req, res, next) => {
  const data = {
    UserId: Number(req.params.id),
    RoleId: req.body.Id,
  };

  logger.info("roleAssign" + JSON.stringify(data));

  if (data.UserId <= 0 || data.RoleId <=0) {
    const error = new Error('User & Role Id can not be 0 or -Ve number');
    error.status = 400;
    return next(error);
  }

  try {
    const user = await userService.roleAssign(data);
    console.log(user);
    if (user) {
      res.status(200).json({
        'status': 'success',
        'data': user,
      });
    }
    else {
      const error = new Error('Cannot find user due to Invalid Id');
      error.status = 400;
      return next(error);
    }
  } catch(error){
    const e = new Error('Cannot assign role');
    return next(e);
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  roleAssign,
};