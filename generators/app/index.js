'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var lodash = require('lodash');
var uuid = require('uuid');
var randomString = require('randomstring');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');
var buildPrompts = require('../../services/prompts');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-makrina') + ' MEAN generator'
    ));

    return this.prompt(buildPrompts(this)).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  // non-standard method matches to (4) default in run loop before writing
  composing: function () {
    var options = {
      angularAppName: this.props.angularAppName,
      angularAppFullName: this.props.angularAppFullName
    };
    this.composeWith('makrina:angular-app', {options: options});
    lodash.extend(options, {
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl
    });
    this.composeWith('makrina:angular-core-service', {options: options});
    this.composeWith('makrina:angular-component-list', {options: options});
    this.composeWith('makrina:angular-component-detail', {options: options});
    this.composeWith('makrina:model', {options: options});
  },

  writing: function () {
    // explicitly define paths to manipulate output file names
    var templatePaths = [
      'bin/',
      'e2e-tests/protractor.conf.js',
      'public/images/',
      'public/javascripts/_name_.js',
      'public/stylesheets/_name_.sass',
      'routes/',
      'services/',
      'spec/',
      'views/',
      '_editorconfig',
      '_gitignore',
      '_gitlab-ci.yml',
      'app.js',
      'CHANGELOG',
      'CONTRIBUTING.md',
      'fonts.list',
      'gulpfile.js',
      'karma.conf.js',
      'LICENSE',
      'newrelic.js',
      'package.json',
      'README.md'
    ];
    var copyPaths = [
      'public/images/'
    ];

    // Template context variables
    var git = this.props.git;
    // Remove suffix from git repo to add in template
    if (git.endsWith('.git')) git = git.substring(0, git.length - 4);

    var context = buildContext({
      name: this.props.name,
      verboseName: this.props.verboseName,
      description: this.props.description,
      git: git,
      author: this.props.author,
      deployHost: this.props.deployHost,
      newRelicLicense: this.props.newRelicLicense,
      uuid: uuid.v4(),
      pass: randomString.generate(12),
      organization: this.props.organization,
      organizationUrl: this.props.organizationUrl,
      angularAppFullName: this.props.angularAppFullName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl,
      header: function (val, char) {
        // return an underline of `char`s for markdown based on `val` length
        return new Array(val.length + 1).join(char);
      }
    });
    var $this = this;

    // Copy all templates
    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(pathNames(templatePath, $this.props)),
        context
      );
    });

    // Copy files that do not need template
    copyPaths.forEach(function (copyPath) {
      $this.fs.copy(
        $this.templatePath(copyPath),
        $this.destinationPath(copyPath)
      );
    });
  },

  install: function () {
    this.installDependencies();
  }
});
