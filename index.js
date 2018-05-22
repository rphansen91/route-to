const route = require("./router/route");
const combineRoutes = require("./router/combine");
const bodyParser = require("./parsers/bodyParser");
const jsonParser = require("./parsers/jsonParser");

module.exports = {
  route,
  combineRoutes,
  bodyParser,
  jsonParser
};
