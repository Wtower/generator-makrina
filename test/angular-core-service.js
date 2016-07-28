/**
 * Created by gkarak on 28/7/2016.
 */
'use strict';
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
      objectName: 'node',
      objectTitle: 'Node',
      objectUrl: 'node'
    }}];

  runs.forEach(function (run) {
    before(function () {
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
