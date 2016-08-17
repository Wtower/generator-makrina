'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-makrina:app', function () {
  // test both branches to increase coverage
  var runs = [
    {it: 'no suffix in git prompt', git: 'https://github.com/Wtower/generator-makrina'},
    {it: 'suffix in git prompt', git: 'https://github.com/Wtower/generator-makrina.git'}
  ];

  runs.forEach(function (run) {
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
          git: run.git
        })
        .toPromise();
    });

    it('creates files with ' + run.it, function () {
      var paths = [
        'bin/',
        'e2e-tests/protractor.conf.js',
        'public/images/',
        'public/javascripts/yeotests.js',
        'public/stylesheets/yeotests.sass',
        'routes/',
        'services/',
        'spec/',
        'views/',
        '.editorconfig',
        '.gitignore',
        '.gitlab-ci.yml',
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
});
