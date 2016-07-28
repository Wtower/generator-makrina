/**
 * Created by gkarak on 28/7/2016.
 */
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:angular-component-list', function () {
  var destinationPrefix = 'public/javascripts/admin';
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
      return helpers.run(path.join(__dirname, '../generators/angular-component-list'))
        .inTmpDir(function (dir) {
          fs.copySync(
            path.join(__dirname, '../generators/angular-app/templates/_angular-app-name_.module.js'),
            path.join(dir, destinationPrefix, 'admin.module.js')
          );
          fs.copySync(
            path.join(__dirname, '../generators/angular-app/templates/_angular-app-name_.config.js'),
            path.join(dir, destinationPrefix, 'admin.config.js')
          );
        })
        .withOptions(run.options)
        .toPromise();
    });

    it('creates files with ' + run.it, function () {
      var paths = [
        'node-list.module.js',
        'node-list.component.js',
        'node-list.component.spec.js',
        'node-list.template.html'
      ];
      paths.forEach(function (p) {
        assert.file(path.join(destinationPrefix, 'node-list', p));
      });
      assert.file('e2e-tests/admin.scenarios.js');
    });

    it('updates files with ' + run.it, function () {
      assert.fileContent(path.join(destinationPrefix, 'admin.module.js'), 'nodeList');
      assert.fileContent(path.join(destinationPrefix, 'admin.config.js'), 'node-list');
    });
  });
});
