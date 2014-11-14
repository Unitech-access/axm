# AXM module for Keymetrics I/O

AXM module

```javascript
var axm = require('axm');
```

## Emit Events

```javascript
var axm = require('axm');

axm.emit('user:register', {
  user : 'Alex registered',
  email : 'thorustor@gmail.com'
});
```

## Make function triggerable

```javascript
var axm = require('axm');

axm.action('db:clean', function(reply) {
  clean.db();
  reply({success : true});
});
```

## Errors

Enable catch all errors.

```javascript
axm.catchAll();
```

Notify a custom error

```javascript
axm.notify({ success : false });

axm.notify('This is an error');

axm.notify(new Error('This is an error'));
```

## HTTP latency analysis

```javascript
axm.http(); // You must do this BEFORE any require('http')
```

## Measure

### Metric

Values that can be read instantly.

```javascript
var probe = axm.probe();

var metric = probe.metric({
  name  : 'Realtime user',
  value : function() {
    return Object.keys(users).length;
  }
});
```

### Counter

Things that increment or decrement.

```javascript
var probe = axm.probe();

var counter = probe.counter({
  name : 'Downloads'
});

http.createServer(function(req, res) {
  counter.inc();
  req.on('end', function() {
    counter.dec();
  });
});
```

### Meter

Things that are measured as events / interval.

```javascript
var probe = axm.probe();

var meter = probe.meter({
  name    : 'req/min',
  seconds : 60
});

http.createServer(function(req, res) {
  meter.mark();
  res.end({success:true});
});
```

#### Options

**seconds** option is the measurement rate of the meter, default is 1 seconds

### Histogram

Keeps a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution.

```javascript
var probe = axm.probe();

var histogram = probe.histogram({
  name        : 'latency',
  measurement : 'mean'
});

var latency = 0;

setInterval(function() {
  latency = Math.round(Math.random() * 100);
  histogram.update(latency);
}, 100);
```

#### Options

**measurement** option can be:

- min: The lowest observed value.
- max: The highest observed value.
- sum: The sum of all observed values.
- variance: The variance of all observed values.
- mean: The average of all observed values.
- stddev: The stddev of all observed values.
- count: The number of observed values.
- median: 50% of all values in the resevoir are at or below this value.
- p75: See median, 75% percentile.
- p95: See median, 95% percentile.
- p99: See median, 99% percentile.
- p999: See median, 99.9% percentile.

# License

MIT
