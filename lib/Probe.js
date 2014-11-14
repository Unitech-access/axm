
var Counter   = require('./utils/probes/Counter.js');
var Histogram = require('./utils/probes/Histogram.js');
var Meter     = require('./utils/probes/Meter.js');

var Transport = require('./utils/transport.js');

var Probe = {};

Probe._started = false;
Probe._var     = {};

function cookData(data) {
  var cooked_data = {};

  Object.keys(data).forEach(function(probe_name) {
    if (typeof(data[probe_name]) == 'function')
      cooked_data[probe_name] = data[probe_name]();
    else
      cooked_data[probe_name] = data[probe_name];
  });
  return cooked_data;
};

Probe.probe = function() {

  if (Probe._started == false) {
    Probe._started = true;

    setInterval(function() {
      Transport.send({
        type : 'axm:monitor',
        data : cookData(Probe._var)
      });
    }, 990);
  }

  return {
    metric : function(opts) {
      if (!opts.name)
        return console.error('[Probe][Metric] Name not defined');
      if (typeof(opts.value) === 'undefined')
        return console.error('[Probe][Metric] Value not defined');

      Probe._var[opts.name] = opts.value;

      return {
        val : function() {
          if (typeof(Probe._var[opts.name]) == 'function') {
            return Probe._var[opts.name]();
          }
          else
            return Probe._var[opts.name];
        },
        set : function(dt) {
          Probe._var[opts.name] = dt;
        }
      }
    },
    histogram : function(opts) {
      if (!opts.name)
        return console.error('[Probe][Histogram] Name not defined');
      opts.measurement = opts.measurement || 'mean';

      if (['min',
           'max',
           'sum',
           'count',
           'variance',
           'mean',
           'stddev',
           'median',
           'p75',
           'p95',
           'p99',
           'p999'].indexOf(opts.measurement) == -1)
        return console.error('[Probe][Histogram] Measure type %s does not exists', opts.measurement);

      var histogram = new Histogram(opts);

      Probe._var[opts.name] = function() {
        return histogram.val();
      };

      return histogram;
    },
    meter : function(opts) {
      if (!opts.name)
        return console.error('[Probe][Meter] Name not defined');

      var meter = new Meter(opts);

      Probe._var[opts.name] = function() {
        return meter.val();
      };

      return meter;
    },
    counter : function(opts) {
      if (!opts.name)
        return console.error('[Probe][Counter] Name not defined');

      var counter = new Counter();

      Probe._var[opts.name] = function() {
        return counter.val();
      };

      return counter;
    }
  }
};

module.exports = Probe;
