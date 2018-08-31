const EventEmitter = require("events");

const buildRequest = (event, context, callback) => {
  const request = new EventEmitter();
  request.url = event.path || "";
  request.query = event.queryStringParameters || {};
  return request;
};

const buildResponse = (event, context, callback) => {
  const response = {};
  return {
    writeHead: (statusCode, headers) => {
      response.statusCode = statusCode;
      response.headers = headers;
    },
    end: body => {
      response.body = body;
      callback(null, response);
    }
  };
};

module.exports = router => (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const request = buildRequest(event, context, callback);
    const response = buildResponse(event, context, callback);
    router(request, response);
    if (event.body) {
      request.emit("data", event.body);
      request.emit("end");
    }
  } catch (e) {
    console.log(e, response);
    callback(e.message);
  }
};
