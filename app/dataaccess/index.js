// Import necessary modules
const { Sequelize, DataTypes } = require('sequelize');

// Database connection setup
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Define models
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

const Product = sequelize.define('Product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
});

const UserRole = sequelize.define('UserRole', {
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// Updated Foreign Key Naming
// const userForeignKey = 'userId'; // previously declared
// const productForeignKey = 'productId'; // previously declared

// Exporting models
module.exports = { User, Product, UserRole, sequelize };