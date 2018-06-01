const bodyParser = require("./bodyParser");
const jsonHeaders = require("../headers/jsonHeaders");

module.exports = function jsonParser(req, res, next) {
  bodyParser(req, res, () => {
    try {
      req.body = JSON.parse(req.body);
      next();
    } catch (err) {
      const { message } = err;
      res.writeHead(500, jsonHeaders());
      res.end(JSON.stringify({ message }));
    }
  });
};
