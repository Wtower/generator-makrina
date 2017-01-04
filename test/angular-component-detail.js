/**
 * Created by gkarak on 29/7/2016.
 */
'use strict';
var stubRuns = require('../services/stub');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:angular-component-detail', function () {
  var destinationPrefix = 'public/javascripts/admin';
  // run with and without options to increase branch coverage
  var runs = [
    {it: 'no options', options: {}, configFile: true},
    {it: 'no options, no config file', options: {}, configFile: false},
    {it: 'options', options: {
      angularAppName: 'admin',
      angularAppFullName: 'yeotestsAdminApp',
      angularAppPath: 'public/javascripts',
      objectName: 'node',
      objectTitle: 'Node',
      objectUrl: 'node'
    }, configFile: true}
  ];
  var stub = stubRuns(runs, 2);

  beforeEach(function () {
    var run = stub();
    return helpers.run(path.join(__dirname, '../generators/angular-component-detail'))
      .inTmpDir(function (dir) {
        fs.copySync(
          path.join(__dirname, '../generators/angular-app/templates/_angular-app-name_.module.js'),
          path.join(dir, destinationPrefix, 'admin.module.js')
        );
        if (run.configFile) {
          fs.copySync(
            path.join(__dirname, '../generators/angular-app/templates/_angular-app-name_.config.js'),
            path.join(dir, destinationPrefix, 'admin.config.js')
          );
        }
      })
      .withOptions(run.options)
      .toPromise();
  });

  runs.forEach(function (run) {
    it('creates files with ' + run.it, function () {
      var paths = [
        'node-detail.module.js',
        'node-detail.component.js',
        'node-detail.component.spec.js',
        'node-detail.template.html'
      ];
      paths.forEach(function (p) {
        assert.file(path.join(destinationPrefix, 'node-detail', p));
      });
    });

    it('updates files with ' + run.it, function () {
      assert.fileContent(path.join(destinationPrefix, 'admin.module.js'), 'nodeDetail');
      if (run.configFile) assert.fileContent(path.join(destinationPrefix, 'admin.config.js'), 'node-detail');
      else assert.noFile(path.join(destinationPrefix, 'admin.config.js'));
    });
  });
});
