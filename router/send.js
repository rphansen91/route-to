function sendJson(res) {
  return function(json) {
    res.writeHead(200, "", {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(json));
  };
}

module.exports = {
  sendJson
};
