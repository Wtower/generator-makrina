'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var uuid = require('node-uuid');

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
      // newrelic.js, routes/index.js
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
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // explicitly define paths to manipulate output file names
    var templatePaths = [
      'bin/',
      'e2e-tests/protractor.conf.js',
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
    var today = new Date();
    var context = {
      name: this.props.name,
      verboseName: this.props.verboseName,
      description: this.props.description,
      git: git,
      author: this.props.author,
      deployHost: this.props.deployHost,
      newRelicLicense: this.props.newRelicLicense,
      today: today,
      date: [today.getDate(), today.getMonth() + 1, today.getFullYear()].join('/'),
      uuid: uuid.v4(),
      header: function(val, char) {
        // return an underline of `char`s for markdown based on `val` length
        return new Array(val.length + 1).join(char);
      }
    };
    var $this = this;

    // Copy all templates
    templatePaths.forEach(function (path) {
      // check if should be hidden
      var output = path;
      if (path.startsWith('_')) output = '.' + path.substring(1, path.length);

      $this.fs.copyTpl(
        $this.templatePath(path),
        $this.destinationPath(output),
        context
      );
    });
  },

  install: function () {
    // this.installDependencies();
  }
});
