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

### Gauges

Values that can be read instantly.

```javascript
var probe = axm.probe();

var gauge = probe.gauge({
  name : 'Realtime user',
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

# License

MIT
