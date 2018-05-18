const route = require("./route");

module.exports = function notFoundRoute() {
  const handleNotFound = (req, res) => res.json({ error: "Not Found" });
  return route("*", handleNotFound);
};
