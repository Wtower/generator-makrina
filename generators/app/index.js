'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('generator-makrina') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.appname,
      store: true
    }, {
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(), {
        name: this.props.name,
        someAnswer: this.props.someAnswer
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
