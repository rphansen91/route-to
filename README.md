# Route To

Fast and simple http router.

## Usage

`npm install route-to --save`

```js
const PORT = process.env.PORT || 3000;
const http = require("http");
const { combineRoutes, route, jsonParser } = require("route-to");

const server = http.createServer(
  combineRoutes(
    route("/active", (req, res) => res.json({ active: true })),
    route("/ready", (req, res) => res.json({ ready: true }))
  )
);

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`http://localhost:${PORT}`);
});
```

Browsing to http://localhost:3000/active will render a json response

Browsing to http://localhost:3000/ready will render a different json response

Browsing to http://localhost:3000/adksj will render a Not Found response

## Route Params

```js
route("/user/:id", (req, res) => {
  const { id } = req.params

  findUser({ id })
  .then(user => res.json({ user }))
  .catch(err => res.json(({ error: err.message }))
})
```

## Route Query

```js
route("/user", (req, res) => {
  const { id } = req.query

  findUser({ id })
  .then(user => res.json({ user }))
  .catch(err => res.json(({ error: err.message }))
})
```

## Middleware

* Handle Auth

```js
const { route } = require("route-to");

function isLoggedIn (req, res, next) {
  if (req.headers['X-Auth-Token']) {
    next()
  } else {
    res.writeHead(500)
    res.end()
  }
}

route('/profile/:id', isLoggedIn, () => {
  const { id } = req.query

  findUser({ id, loggedIn: true })
  .then(user => res.json({ user }))
  .catch(err => res.json(({ error: err.message }))
})
```

* JSON Parser

```js
const { route, jsonParser } = require("route-to");

route("/user/update/:id", jsonParser, (req, res) => {
  const { id } = req.params
  const update = req.body

  updateUser({ id }, update)
  .then(user => res.json({ user }))
  .catch(err => res.json(({ error: err.message }))
})
```

## Dependencies

* [url-pattern](https://github.com/snd/url-pattern)
