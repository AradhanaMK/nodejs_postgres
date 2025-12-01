const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addKeyword({
    async: true,
});

const roleCreateSchema = {
    $async: true,
    type: 'object',
    properties: {
        name: {type: 'string', maxLength: 100},
        description: {type: 'string', maxLength: 100},
    },
    required: ['name', 'description'],
    additionalProperties: true,
};

const roleUpdateSchema = {
    $async: true,
    type: 'object',
    properties: {
        name: {type: 'string', maxLength: 100},
        description: {type: 'string', maxLength: 100},
        Id: { type: "integer", default: 0 },
    },
    required: ['Id','name', 'description'],
    additionalProperties: true,
};

const validateCreateRole = ajv.compile(roleCreateSchema);
const validateUpdateRole = ajv.compile(roleUpdateSchema);

module.exports = {
    validateCreateRole,
    validateUpdateRole,
};