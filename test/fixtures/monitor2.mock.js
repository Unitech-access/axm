

var axm = require('../..');

var obj = axm.enableProbes();

var a = {
  'aaa' : { 'ok' : true },
  'bbb' : { 'ok' : false }
};

obj.count = Object.keys(a).length;
