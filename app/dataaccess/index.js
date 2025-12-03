// This file is responsible for managing data access

// Model imports
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order'); // Include order model

// Foreign key definitions
// User ID in Order model
// Represents the user who placed the order
const userForeignKey = 'userId'; // Foreign key for User
// Product ID in Order model
// Represents the product included in the order
const productForeignKey = 'productId'; // Foreign key for Product

// Additional business logic can go here
