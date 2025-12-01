const express = require("express");
var logger = require("./app/utils/logger");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./app/swagger/swagger_output.json')
const app = express();

logger.info("App is started");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const db = require("./app/dataaccess");
db.sequelize.sync({alter:true}) //alter:true
  .then(() => {
    logger.info("Synced db.");
  })
  .catch((err) => {
    logger.info("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use('/swagger/index.html', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node js best practice application." });
});
require("./app/routes/index.routes")(app);

// CORS configuration
app.use((req, res, next) => {
  // Allow any origin to access this API, for developing purposes
  // Should be set a specific origin for production
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET, OPTIONS');
      return res.status(200).json({});
  }
  if (req.method !== 'OPTIONS' &&
  req.method !== 'GET' &&
  req.method !== 'POST' &&
  req.method !== 'DELETE' &&
  req.method !== 'PATCH') {
      const error = new Error('Method not allowed');
      error.status = 405;
      next(error);
  }
  next();
});

// Handle requests to invalid resources
app.use((req, res, next) => {
  const error = new Error('Invalid request! No resource was found!');
  logger.error(error.message);
  error.status = 404; // Not Found
  next(error);
});

// Handle errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  logger.error(error.message);
  res.json({
      'error': {
          'message': error.message,
      },
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

module.exports = app