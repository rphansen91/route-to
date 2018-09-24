const serverlessProxy = require("../serverlessProxy");
const routes = require("./routes");

module.exports.handler = serverlessProxy(routes);
