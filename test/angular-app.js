/**
 * Created by gkarak on 28/7/2016.
 */
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-makrina:angular-app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/angular-app'))
      .withOptions({
        angularAppName: 'admin',
        angularAppFullName: 'yeotestsAdminApp'
      })
      // @todo run tests with and w/o options to increase branch%
      .toPromise();
  });

  it('creates files', function () {
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
