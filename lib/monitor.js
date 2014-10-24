
var Transport = require('./utils/transport.js');
var debug = require('debug')('axm:monitor');

var Monitor = {};

function enableProbes(custom_namespace) {
  if (!custom_namespace)
    custom_namespace = 'axm';

  if (!global[custom_namespace])
    global[custom_namespace] = {};

  if (this.interval)
    return global[custom_namespace];

  this.interval = setInterval(function() {
    Transport.send({
      type : 'axm:monitor',
      data : global[custom_namespace]
    });
  }, 990);

  return global[custom_namespace];
};

function stopProbing() {
  clearInterval(this.interval);
}

Monitor.enableProbes = enableProbes;
Monitor.enableProbe = enableProbes;

Monitor.stopProbe = stopProbing;
Monitor.stopProbes = stopProbing;

module.exports = Monitor;
