var http  = require('http');
var axm = require('axm');

var probe = axm.enableProbes();

var meter = new axm.tools.Meter();

http.createServer(function(req, res) {
  meter.mark();
  res.end('Thanks');
}).listen(3000);

probe['1min rate'] = function() {
	return meter.toJSON()['1MinuteRate'];
};
