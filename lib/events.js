

var debug     = require('debug')('axm:events');
var Transport = require('./utils/transport.js');

var Events = {};

Events.emit = function(type, data) {
  if (!type)
    return console.error('[AXM] emit.type is missing');
  if (!data)
    return console.error('[AXM] emit.data is missing');

  Transport.send({
    type : 'human:event',
    data : {
      name       : type,
      data       : data,
      at         : Date.now()
    }
  });
  return false;
};

module.exports = Events;
