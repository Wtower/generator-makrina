'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var uuid = require('node-uuid');
var randomString = require('randomstring');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-makrina') + ' MEAN generator'
    ));

    var prompts = [{
      // package.json, README.md, newrelic.js, services/mongoose.js
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname
    }, {
      // newrelic.js, routes/index.js, routes/admin.js
      type: 'input',
      name: 'verboseName',
      message: 'Verbose name',
      default: this.appname
    }, {
      // package.json, README.md, routes/index.js, views/index.ejs
      type: 'input',
      name: 'description',
      message: 'Description',
      default: this.appname
    }, {
      // package.json
      type: 'input',
      name: 'git',
      message: 'Git repository URL'
    }, {
      // package.json, LICENSE, CONTRIBUTING.md, views/index.ejs
      type: 'input',
      name: 'author',
      message: 'Author',
      store: true
    }, {
      // views/index.ejs, views/login.ejs, views/admin.ejs
      type: 'input',
      name: 'organization',
      message: 'Organization',
      store: true
    }, {
      // views/login.ejs, views/admin.ejs
      type: 'input',
      name: 'organizationUrl',
      message: 'Organization URL',
      store: true
    }, {
      // package.json
      type: 'input',
      name: 'deployHost',
      message: 'Deploy host',
      store: true
    }, {
      // newrelic.js
      type: 'input',
      name: 'newRelicLicense',
      message: 'New Relic license key',
      store: true
    }, {
      // makrina:angular-app
      type: 'input',
      name: 'angularAppName',
      message: 'Angular app short name',
      default: 'admin'
    }, {
      type: 'input',
      name: 'angularAppFullName',
      message: 'Angular app name',
      default: this.appname + 'AdminApp'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  // non-standard method matches to (4) default in run loop before writing
  composing: function() {
    this.composeWith('makrina:angular-app', {
      options: {
        angularAppName: this.props.angularAppName,
        angularAppFullName: this.props.angularAppFullName
      }
    });
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
      'services/session-config.js',
      'services/i18n-config.js',
      'views/',
      '_gitignore',
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
      header: function(val, char) {
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
  },

  install: function () {
    // this.installDependencies();
  }
});
