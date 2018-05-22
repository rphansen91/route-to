const bodyParser = require("./bodyParser");

module.exports = function jsonParser(req, res, next) {
  bodyParser(req, res, () => {
    try {
      req.body = JSON.parse(req.body);
      next();
    } catch (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    }
  });
};
