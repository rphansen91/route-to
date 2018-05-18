const UrlPattern = require("url-pattern");

function route(matcher, fn) {
  const isMatch = routeMatcher(matcher);
  const handleRequest = (req, res) => fn(req, res);
  return { isMatch, handleRequest };
}

function routeMatcher(matcher) {
  if (typeof matcher === "string") {
    const pattern = new UrlPattern(matcher);
    return url => pattern.match(url);
  }
  return () => false;
}

route.isRoute = function isRoute(route) {
  if (typeof route.isMatch !== "function") return false;
  if (typeof route.handleRequest !== "function") return false;
  return true;
};

module.exports = route;
