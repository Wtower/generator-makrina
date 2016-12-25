/**
 * Created by gkarak on 9/8/2016.
 */
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-makrina:angular-controller-form', function () {
  var destinationPrefix = 'public/javascripts/admin';
  // run with and without options to increase branch coverage
  var runs = [
    // {it: 'no options', options: {}},
    {it: 'options', options: {
      angularAppName: 'admin',
      angularAppFullName: 'yeotestsAdminApp',
      angularAppPath: 'public/javascripts'
    }}];

  runs.forEach(function (run) {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/angular-controller-form'))
        .withOptions(run.options)
        .toPromise();
    });

    it('creates files with ' + run.it, function () {
      var paths = [
        'form.controller.js',
        'form.controller.spec.js'
      ];
      paths.forEach(function (p) {
        assert.file(path.join(destinationPrefix, 'form', p));
      });
    });
  });
});
