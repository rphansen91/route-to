const querystring = require("querystring");
const notFoundRoute = require("./notFound");
const { isRoute } = require("./route");
const { sendJson } = require("./send");

module.exports = function combineRoutes(...routes) {
  const activeRoutes = []
    .concat(routes)
    .concat(notFoundRoute())
    .filter(isRoute);

  return function(req, res) {
    const [url, query] = req.url.split("?");

    // PREPARE REQ
    req.query = querystring.parse(query);

    // PREPARE RES
    res.json = sendJson(res);

    for (let i = 0; i < activeRoutes.length; i++) {
      const { isMatch, isMethod, handleRequest } = activeRoutes[i];
      const params = isMatch(url);
      if (params && isMethod(req)) {
        req.params = params;
        handleRequest(req, res);
        break;
      }
    }
  };
};
