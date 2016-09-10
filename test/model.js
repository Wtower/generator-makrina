/**
 * Created by gkarak on 29/7/2016.
 */
'use strict';
var stubRuns = require('../services/stub');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:model', function () {
  // run with and without options to increase branch coverage
  var runs = [
    {it: 'no options', options: {}},
    {it: 'options', options: {
      objectName: 'node',
      objectTitle: 'Node',
      objectUrl: 'node'
    }}];
  var stub = stubRuns(runs, 2);

  beforeEach(function () {
    var run = stub();
    return helpers.run(path.join(__dirname, '../generators/model'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../generators/app/templates/app.js'), path.join(dir, 'app.js'));
        fs.copySync(
          path.join(__dirname, '../generators/app/templates/services/mongoose.js'),
          path.join(dir, 'services/mongoose.js')
        );
      })
      .withOptions(run.options)
      .toPromise();
  });

  runs.forEach(function (run) {
    it('creates files with ' + run.it, function () {
      var paths = [
        'models/node.js',
        'routes/api/nodes.js'
      ];
      paths.forEach(function (p) {
        assert.file(p);
      });
    });

    it('updates files with ' + run.it, function () {
      assert.fileContent('app.js', 'apiNodes');
      assert.fileContent('services/mongoose.js', 'models/node');
    });
  });
});
