/**
 * Created by gkarak on 27/7/2016.
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
    this.log('Generating ' + chalk.red('angular-component-list') + ' module');

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
      '_object-name_-list.module.js',
      '_object-name_-list.component.js.ejs',
      '_object-name_-list.component.spec.js.ejs',
      '_object-name_-list.template.html'
    ];

    if (this.options.objectName) lodash.extend(this.props, this.options);
    var context = buildContext({
      angularAppName: this.props.angularAppName,
      angularAppFullName: this.props.angularAppFullName,
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
          $this.props.objectUrl + '-list',
          pathNames(templatePath, $this.props)
        ),
        context
      );
    });

    // Copy templates for e2e-tests
    // Could happen per component, but too much templating for regex append
    var templatePath = 'e2e-tests/_angular-app-name_-_object-name_.scenarios.js.ejs';
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(pathNames(templatePath, this.props)),
      context
    );

    // Modify files: append object-list to app module
    templatePath = this.destinationPath(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.angularAppName + '.module.js'
    );
    this.fs.copy(templatePath, templatePath, {
      process: function (content) {
        return append.dependency(content, $this.props.objectName + 'List');
      }
    });

    // Modify files: append object-list route to app config
    templatePath = this.destinationPath(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.angularAppName + '.config.js'
    );
    this.fs.copy(templatePath, templatePath, {
      process: function (content) {
        return append.angularRoute(content, $this.props.objectUrl + 's', $this.props.objectUrl + '-list');
      }
    });
  }
});
