const Ajv = require("ajv");
const ajv = new Ajv();

ajv.addKeyword({
    async: true,
});

const emailPattern =
    "^[-!#$%&'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$";

const userCreateSchema = {
    $async: true,
    type: "object",
    properties: {
        email: {
            type: "string",
            maxLength: 50,
            pattern: emailPattern,
        },
        password: { type: "string", maxLength: 50, minLength: 8 },
        name: { type: "string", maxLength: 50 },
    },
    required: ["name", "email", "password"],
    additionalProperties: true,
};

const userUpdateSchema = {
    $async: true,
    type: "object",
    properties: {
        email: {
            type: "string",
            maxLength: 50,
            pattern: emailPattern,
        },
        password: { type: "string", maxLength: 50, minLength: 8 },
        name: { type: "string", maxLength: 50 },
        Id: { type: "integer", default: 0 },
    },
    required: ["Id", "name", "email", "password"],
    additionalProperties: true,
};


const validateCreateUser = ajv.compile(userCreateSchema);
const validateUpdateUser = ajv.compile(userUpdateSchema);

module.exports = {
    validateCreateUser,
    validateUpdateUser,
};
