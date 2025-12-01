## Getting started
# Node.js and PostgreSQL CRUD example with Express Rest APIs

This project provides a skeleton for any further RESTful API development. It implements the **4 Layer Architecture**, which are Router, Controller, Service Layer and Data Access Layer.

**Router** That passes requests to the corresponding controller
**Controller** will handle all stuffs related to requests and responses that are routed by *Router*.
**Service Layer** The whole business logic will be in the Service Layer that exports certain methods which are used by the controller. 
**Data Access Layer** will perform some operations on the database.

## Features

- **No-SQL Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM(Object-Relational-Mapper):** [Sequelize](https://www.npmjs.com/package/sequelize)
- **Validation:** [Ajv](https://ajv.js.org/) JSON schema validator
- **Logging:** [Winston](https://www.npmjs.com/package/winston)
- **Unit Testing:** Unit Testing with[Jest] (https://www.npmjs.com/package/jest)
- **CORS** configuration.
- **Static code analysis:**  [Eslint](https://eslint.org/).
- **Error Handling:** centralized error handling mechanism
- **API documentation:** [Swagger](https://www.npmjs.com/package/swagger-autogen)
- **Authentication and Authorization:** Bearer JWT Token