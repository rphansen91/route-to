const jsonHeaders = require("../headers/jsonHeaders");

function sendJson(res) {
  return function(json) {
    res.writeHead(200, jsonHeaders());
    res.end(JSON.stringify(json));
  };
}

module.exports = {
  sendJson
};
