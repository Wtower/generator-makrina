/**
 * Created by gkarak on 10/9/2016.
 * Stub function to return the appropriate run each time called
 * To be invoked by tests beforeEach function
 */
var sinon = require('sinon');

var stubRuns = function (runs, its) {
  var stub = sinon.stub();
  runs.forEach(function (run, idx) {
    // beforeEach will be called runs * its times
    for (var i = 0; i < its; i++) {
      stub.onCall((idx * its) + i).returns(run);
    }
  });
  return stub;
};

module.exports = stubRuns;
