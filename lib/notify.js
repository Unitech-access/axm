
var debug = require('debug')('axm:notify');
var Common    = require('./common.js');

var Notify = {};
var Transport = require('./utils/transport.js');

var jsonize = function(err, filter, space) {
  if (typeof(err) != 'object')
    return err;

  var plainObject = {};

  Object.getOwnPropertyNames(err).forEach(function(key) {
    plainObject[key] = err[key];
  });
  return plainObject;
};

Notify.catchAll = function() {
  process.once('uncaughtException', function(err) {
    debug(err.stack || err);
    Transport.send({
      type : 'process:exception',
      data : jsonize(err)
    });
  });
};

Notify.notify = function(err) {
  if (!(err instanceof Error))
    err = new Error(err);

  debug(err.stack || err);

  Transport.send({
    type : 'process:exception',
    data : jsonize(err)
  });
};

Notify.expressErrorHandler = function() {
  var self = this;

  return function errorHandler(err, req, res, next) {
    if (res.statusCode < 400) res.statusCode = 500;

    debug(err.stack || err);

    err.url = req.url;
    err.component = req.url;
    err.action = req.method;
    err.params = req.body;
    err.session = req.session;

    Transport.send({
      type  : 'process:exception',
      data  : jsonize(err)
    });
    return next(err);
  };
};

module.exports = Notify;
