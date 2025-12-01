const bcrypt = require('bcrypt');
const db = require("../dataaccess");
var logger = require("../utils/logger");
const tblUser = db.users;
const tblUserRole = db.userRole;
const Op = db.Sequelize.Op;

//Create a user
const createUser = async (userData) => {
    console.log("Service " + JSON.stringify(userData));
    // send email, if verified, create user
    return new Promise((resolve, reject) => {
        bcrypt.hash(userData.password, 10, async function (err, hash) {
            if (err) {
                reject(new Error('Error hashing password'));
            } else {
                userData.password = hash;
                const duplicationCheck = await tblUser.findOne({ where: { email: userData.email }, raw: true });
                if (duplicationCheck) {
                    logger.warn("User already exist." + JSON.stringify(duplicationCheck));
                    resolve(null);
                }
                else {
                    tblUser.create(userData).then((result) => resolve(result));
                }
            }
        });
    });
};

//Update a user
const updateUser = async (userData) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(userData.password, 10, async function (err, hash) {
            if (err) {
                reject(new Error('Error hashing password'));
            } else {
                userData.password = hash;
                // await tblUser.update(userData, { where: { Id: userData.Id }}).then((result) => 
                // {console.log(result)
                // resolve(result)}).catch((err) => reject(err));
                await tblUser.update(userData, { where: { Id: userData.Id } }).then((result) => {
                    if (result[0] == 1) {
                        resolve(result)
                    } else {
                        resolve(null)
                    }
                }).catch((err) => reject(err));
            }
        });
    });
};

//Get a user by Id
const getUserById = async (Id) => {
    return new Promise(async (resolve, reject) => {
        await tblUser.findByPk(Id).then((result) => {
            //console.log(result)
            if (result) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    });
};

//Get all users
const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        await tblUser.findAll({ where: { isDeleted: false } }).then((result) => {
            if (result) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    });
};

//Delete a user
const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        await tblUser.destroy({ where: { Id: id } }).then((result) => {
            //console.log("Result", result)
            if (result) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    });
};



const verifyUser = async (userData) => {
    const user = await User.verifyUser(userData.email);
    if (user != null) {
        return await bcrypt.compare(userData.password, user.password);
    }
    return Promise.resolve(null);
};

//Assign a Role
const roleAssign = async (data) => {
    console.log("data", data)
    return new Promise(async (resolve, reject) => {
        await tblUserRole.create(data).then((result) => {
            console.log("Result", result)
            if (result) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    });
};


module.exports = {
    createUser,
    verifyUser,
    updateUser,
    getUserById,
    getAllUsers,
    deleteUser,
    roleAssign,
};
