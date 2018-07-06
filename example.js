const http = require("http");
const {
  combineRoutes,
  middleware,
  route,
  setBasePath,
  jsonParser
} = require("./");
const port = 3003;
const base = "/base";

const server = http.createServer(
  middleware(
    setBasePath(base),
    combineRoutes(
      route.get("/", sendJson),
      route.get("/user/find/:id", findUser),
      route.get("/profile/:id", isLoggedIn, findUser),
      route.post("/user/update/:id", jsonParser, updateUser)
    )
  )
);

function sendJson(req, res) {
  res.json({ hello: "JSON" });
}

function isLoggedIn(req, res, next) {
  if (req.headers["X-Auth-Token"]) {
    next();
  } else {
    res.writeHead(500);
    res.end("Not logged in");
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
