module.exports = base => (req, res, next) => {
  req.url = req.url.replace(base, "");
  next();
};
