module.exports = (app) => {
    const routeUser = require("./user.routes.js")
    const routeRole = require("./role.routes.js")
  
    app.use("/v1/api/user", routeUser
        // #swagger.tags = ['User']
    )
    app.use("/v1/api/role", routeRole
        // #swagger.tags = ['Role']
    )
}
