/**
 * Created by gkarak on 28/7/2016.
 */
'use strict';
var stubRuns = require('../services/stub');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:angular-core-service', function () {
  var destinationPrefix = 'public/javascripts/admin/core';
  // run with and without options to increase branch coverage
  var runs = [
    {it: 'no options', options: {}},
    {it: 'options', options: {
      angularAppName: 'admin',
      angularAppFullName: 'yeotestsAdminApp',
      angularAppPath: 'public/javascripts',
      objectName: 'node',
      objectTitle: 'Node',
      objectUrl: 'node'
    }}];
  var stub = stubRuns(runs, 2);

  beforeEach(function () {
    var run = stub();
    return helpers.run(path.join(__dirname, '../generators/angular-core-service'))
      .inTmpDir(function (dir) {
        fs.copySync(
          path.join(__dirname, '../generators/angular-app/templates/core/core.module.js'),
          path.join(dir, destinationPrefix, 'core.module.js')
        );
      })
      .withOptions(run.options)
      .toPromise();
  });

  runs.forEach(function (run) {
    it('creates files with ' + run.it, function () {
      var paths = [
        'node.module.js',
        'node.service.js',
        'node.service.spec.js'
      ];
      paths.forEach(function (p) {
        assert.file(path.join(destinationPrefix, 'node', p));
      });
    });

    it('updates files with ' + run.it, function () {
      assert.fileContent(path.join(destinationPrefix, 'core.module.js'), 'core.node');
    });
  });
});
