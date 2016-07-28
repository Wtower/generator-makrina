/**
 * Created by gkarak on 28/7/2016.
 */
'use strict';
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

  runs.forEach(function (run) {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/angular-app'))
        .withOptions(run.options)
        .toPromise();
    });

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
