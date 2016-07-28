'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-makrina:app', function () {
  // var repos = [
  //   'https://github.com/Wtower/generator-makrina',
  //   'https://github.com/Wtower/generator-makrina.git'
  // ];
  // repos.forEach(function (repo) {
  //   // @todo put tests in here to increase branch%
  // });

  before(function () {
    var dependencies = [
      [helpers.createDummyGenerator(), 'makrina:angular-app'],
      [helpers.createDummyGenerator(), 'makrina:angular-core-service'],
      [helpers.createDummyGenerator(), 'makrina:angular-component-list'],
      [helpers.createDummyGenerator(), 'makrina:angular-component-detail'],
      [helpers.createDummyGenerator(), 'makrina:model']
    ];
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators(dependencies)
      .withPrompts({
        name: 'yeotests',
        git: 'https://github.com/Wtower/generator-makrina.git'
      })
      .toPromise();
  });

  it('creates files', function () {
    var paths = [
      'bin/',
      'e2e-tests/protractor.conf.js',
      'public/images/',
      'public/javascripts/yeotests.js',
      'public/stylesheets/yeotests.sass',
      'routes/',
      'services/',
      'views/',
      '.editorconfig',
      '.gitignore',
      'app.js',
      'CHANGELOG',
      'CONTRIBUTING.md',
      'fonts.list',
      'gulpfile.js',
      'karma.conf.js',
      'LICENSE',
      'newrelic.js',
      'package.json',
      'README.md',
      'public/images/'
    ];
    assert.file(paths);
  });
});
