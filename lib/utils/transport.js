
var debug = require('debug')('axm:transport');

var Transport = module.exports = {};

function ipcSend(args) {
  if (!process.send) {
    var output = args.data;
    delete output.__name;
    return console.log(output.stack || output);
  }
  try {
    process.send(args);
  } catch(e) {
    console.error(e.stack);
  }
};

Transport.send = function(args) {
  ipcSend(args);
};
