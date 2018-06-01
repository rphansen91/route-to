const http = require("http");
const { combineRoutes, route, jsonParser } = require("./");
const port = 3003;

const server = http.createServer(
  combineRoutes(
    route("/", jsonParser, sendJson),
    route("/user/find/:id", findUser),
    route("/user/update/:id", jsonParser, updateUser),
    route("/profile/:id", isLoggedIn, findUser)
  )
);

function sendJson(req, res) {
  res.json(req.body);
}

function isLoggedIn(req, res, next) {
  if (req.headers["X-Auth-Token"]) {
    next();
  } else {
    res.writeHead(500);
    res.end();
  }
}

let mockUser = {
  name: "TChalla"
};

function findUser(req, res) {
  const { id } = req.params;
  mockUser.id = id;
  return Promise.resolve(mockUser)
    .then(result => res.json(result))
    .catch(({ message: error }) => res.json({ error }));
}

function updateUser(req, res) {
  const { id } = req.params;
  const update = req.body;
  mockUser.id = id;
  return Promise.resolve(Object.assign(mockUser, update))
    .then(result => res.json(result))
    .catch(({ message: error }) => res.json({ error }));
}

server.listen(port, () => console.log(`http://localhost:${port}`));
