const db = require("../dataaccess");
var logger = require("../utils/logger");
const tblRole = db.roles;
const Op = db.Sequelize.Op;

//Create a Role
const createRole = async (roleData) => {
    return new Promise(async (resolve, reject) => {
        const duplicationCheck = await tblRole.findOne({ where: { name: roleData.name } });
        if (duplicationCheck) {
            resolve(null);
        }
        else {
            tblRole.create(roleData).then((result) => resolve(result));
        }
    }).catch((err) => reject(err));;
};

//Update a Role
const updateRole = async (roleData) => {
    return new Promise(async (resolve, reject) => {
        await tblRole.update(roleData, { where: { Id: roleData.Id } }).then((result) => {
            if (result[0] == 1) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    })
};

//Get all Roles
const getAllRoles = async () => {
    return new Promise(async (resolve, reject) => {
        await tblRole.findAll({ where: { isDeleted: false } }).then((result) => {
            if (result) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    });
};

//Get a user by Id
const getRoleById = async (Id) => {
    return new Promise(async (resolve, reject) => {
        await tblRole.findByPk(Id).then((result) => {
            if (result) {
                resolve(result)
            } else {
                resolve(null)
            }
        }).catch((err) => reject(err));
    });
};

module.exports = {
    createRole,
    updateRole,
    getAllRoles,
    getRoleById
};