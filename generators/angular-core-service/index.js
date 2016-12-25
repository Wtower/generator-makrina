/**
 * Created by gkarak on 19/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var lodash = require('lodash');
var prompts = require('../../services/prompts');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');
var append = require('../../services/append');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-core-service') + ' module');

    var componentPrompts = prompts.angularAppPrompts(this).concat(prompts.angularObjectPrompts(this));
    return this.prompt(this.options.objectName ? [] : componentPrompts)
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  saveConfig: function () {
    this.config.set('angularAppName', this.props.angularAppName);
    this.config.set('angularAppFullName', this.props.angularAppFullName);
    this.config.set('angularAppPath', this.props.angularAppPath);
    this.config.set('objectName', this.props.objectName);
    this.config.set('objectTitle', this.props.objectTitle);
    this.config.set('objectUrl', this.props.objectUrl);
  },

  writing: function () {
    var templatePaths = [
      '_object-name_.module.js',
      '_object-name_.service.js',
      '_object-name_.service.spec.js'
    ];

    if (this.options.objectName) lodash.extend(this.props, this.options);
    var context = buildContext({
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl
    });
    var $this = this;

    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(
          $this.props.angularAppPath,
          $this.props.angularAppName,
          'core',
          $this.props.objectUrl,
          pathNames(templatePath, $this.props)
        ),
        context
      );
    });

    // Modify files: append core.object to core
    // http://stackoverflow.com/questions/19178523/can-yeoman-generators-update-existing-files
    var templatePath = this.destinationPath(
      'public/javascripts/',
      this.props.angularAppName,
      'core',
      'core.module.js'
    );
    this.fs.copy(templatePath, templatePath, {
      process: function (content) {
        return append.dependency(content, 'core.' + $this.props.objectName);
      }
    });
  }
});
