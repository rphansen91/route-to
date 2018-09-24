const http = require("http");
const { middleware, setBasePath } = require("../");
const routes = require("./routes");
const port = 3003;
const base = "/base";

const router = middleware(setBasePath(base), routes);
const server = http.createServer(router);

server.listen(port, () => console.log(`http://localhost:${port}`));
