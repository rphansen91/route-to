const route = require("./router/route");
const combineRoutes = require("./router/combine");
const middleware = require("./router/middleware");
const setBasePath = require("./parsers/basePath");
const bodyParser = require("./parsers/bodyParser");
const jsonParser = require("./parsers/jsonParser");

module.exports = {
  route,
  combineRoutes,
  middleware,
  setBasePath,
  bodyParser,
  jsonParser
};
