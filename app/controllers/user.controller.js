// Import necessary modules and dependencies
const User = require('../models/user.model');
const logger = require('../utils/logger');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    // Basic validation step
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required.' });
    }
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        logger.error('Error creating user: ', error);
        res.status(500).send({ message: 'An error occurred while creating the user.' });
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

// Update a user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    // Basic validation step
    if (!name && !email) {
        return res.status(400).send({ message: 'At least one of name or email must be provided.' });
    }
    try {
        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        logger.error('Error updating user: ', error);
        res.status(500).send({ message: 'An error occurred while updating the user.' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting user: ', error);
        res.status(500).send({ message: 'An error occurred while deleting the user.' });
    }
};