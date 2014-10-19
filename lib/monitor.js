
var Transport = require('./utils/transport.js');
var debug = require('debug')('axm:monitor');

var Monitor = {};

Monitor.activeCustomMonitor = function(custom_namespace) {
  if (!custom_namespace)
    custom_namespace = 'axm';

  if (!global[custom_namespace])
    global[custom_namespace] = {};

  setInterval(function() {
    Transport.send({
      type : 'axm:monitor',
      data : global[custom_namespace]
    });
  }, 990);

  return global[custom_namespace];
};

module.exports = Monitor;
