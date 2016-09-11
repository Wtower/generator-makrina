/**
 * Created by gkarak on 28/7/2016.
 */
'use strict';
var stubRuns = require('../services/stub');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-makrina:angular-app', function () {
  // run with and without options to increase branch coverage
  var runs = [
    {it: 'no options', options: {}},
    {it: 'options', options: {
      angularAppName: 'admin',
      angularAppFullName: 'yeotestsAdminApp'
    }}];
  var stub = stubRuns(runs, 1);

  beforeEach(function () {
    var run = stub();
    return helpers.run(path.join(__dirname, '../generators/angular-app'))
      .withOptions(run.options)
      .toPromise();
  });

  runs.forEach(function (run) {
    it('creates files with ' + run.it, function () {
      var paths = [
        'core/',
        'admin.animations.sass',
        'admin.config.js',
        'admin.generic.sass',
        'admin.jquery.js',
        'admin.module.js'
      ];
      var destinationPrefix = 'public/javascripts/admin';
      paths.forEach(function (p) {
        assert.file(path.join(destinationPrefix, p));
      });
    });
  });
});
