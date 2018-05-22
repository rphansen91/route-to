module.exports = function bodyParser(req, res, next) {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    req.body = body;
    next();
  });
  req.on("error", err => {
    console.log(err);
    res.writeHead(500);
    res.end();
  });
};
