const UrlPattern = require("url-pattern");
const middleware = require("./middleware");

function route(matcher, ...fns) {
  const isMatch = routeMatcher(matcher);
  const handleRequest = middleware(...fns);
  const isMethod = v => true;
  return { isMatch, isMethod, handleRequest };
}

function methodRoute(method) {
  return function(...args) {
    const isMethod = req => req.method === method;
    return Object.assign({}, route(...args), { isMethod });
  };
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
  if (typeof route.isMethod !== "function") return false;
  if (typeof route.handleRequest !== "function") return false;
  return true;
};

route.get = methodRoute("GET");
route.put = methodRoute("PUT");
route.post = methodRoute("POST");
route.head = methodRoute("HEAD");
route.patch = methodRoute("PATCH");
route.delete = methodRoute("DELETE");
route.options = methodRoute("OPTIONS");

module.exports = route;
