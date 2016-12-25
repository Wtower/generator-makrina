/**
 * Created by gkarak on 26/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var lodash = require('lodash');
var prompts = require('../../services/prompts');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-app') + ' application module');

    return this.prompt(this.options.angularAppName ? [] : prompts.angularAppPrompts(this))
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  saveConfig: function () {
    this.config.set('angularAppName', this.props.angularAppName);
    this.config.set('angularAppFullName', this.props.angularAppFullName);
    this.config.set('angularAppPath', this.props.angularAppPath);
  },

  writing: function () {
    var templatePaths = [
      'core/',
      'dashboard/',
      '_angular-app-name_.animations.sass',
      '_angular-app-name_.config.js',
      '_angular-app-name_.generic.sass',
      '_angular-app-name_.jquery.js',
      '_angular-app-name_.module.js'
    ];

    if (this.options.angularAppName) lodash.extend(this.props, this.options);
    var context = buildContext({
      angularAppName: this.props.angularAppName,
      angularAppFullName: this.props.angularAppFullName
    });
    var $this = this;

    // Copy all templates
    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(
          $this.props.angularAppPath,
          $this.props.angularAppName,
          pathNames(templatePath, $this.props)
        ),
        context
      );
    });
  }
});
