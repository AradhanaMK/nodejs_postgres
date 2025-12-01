const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      title: 'User Management API',
      description: 'Manage user operation',
    },
    host: 'localhost:8081',
    schemes: ['http'],
  };

const outputFile = './app/swagger/swagger_output.json'
const endpointsFiles = ['./app/routes/index.routes.js']
swaggerAutogen(outputFile, endpointsFiles, doc)
