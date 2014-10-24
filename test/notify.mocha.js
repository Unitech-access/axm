

var axm = require('..');

function forkCatch() {
  var app = require('child_process').fork(__dirname + '/fixtures/notify_catch_all.mock.js', []);
  return app;
}

function forkNotify() {
  var app = require('child_process').fork(__dirname + '/fixtures/notify.mock.js', []);
  return app;
}

describe('Notify exceptions', function() {
  it('should have the right properties', function(done) {
    axm.should.have.property('catchAll');
    axm.should.have.property('notify');
    axm.should.have.property('expressErrorHandler');
    done();
  });

  it('should catchAll exception in fork mode', function(done) {
    var app = forkCatch();

    app.on('message', function(data) {
      data.type.should.eql('process:exception');
      data.data.message.should.eql('global error');
      process.kill(app.pid);
      done();
    });
  });

  it('should notify process about error', function(done) {
    var app = forkNotify();

    app.on('message', function(data) {
      data.type.should.eql('process:exception');
      data.data.message.should.eql('hey');
      process.kill(app.pid);
      done();
    });
  });

});
