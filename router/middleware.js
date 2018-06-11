module.exports = function middleware(...fns) {
  return (...args) => {
    return fns.reduceRight((acc, fn) => () => fn(...args, acc), () => {})();
  };
};
