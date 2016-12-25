/**
 * Created by gkarak on 28/7/2016.
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
    this.log('Generating ' + chalk.red('angular-component-detail') + ' module');

    var componentPrompts = prompts.angularAppPrompts(this).concat(prompts.angularObjectPrompts());
    return this.prompt(this.options.objectName ? [] : componentPrompts)
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  writing: function () {
    var templatePaths = [
      '_object-name_-detail.module.js',
      '_object-name_-detail.component.js.ejs',
      '_object-name_-detail.component.spec.js.ejs',
      '_object-name_-detail.template.html'
    ];

    if (this.options.objectName) lodash.extend(this.props, this.options);
    var context = buildContext({
      angularAppName: this.props.angularAppName,
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl
    });
    var $this = this;

    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(
          'public/javascripts/',
          $this.props.angularAppName,
          $this.props.objectUrl + '-detail',
          pathNames(templatePath, $this.props)
        ),
        context
      );
    });

    // Modify files: append object-detail to app module
    var templatePath = this.destinationPath(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.angularAppName + '.module.js'
    );
    this.fs.copy(templatePath, templatePath, {
      process: function (content) {
        return append.dependency(content, $this.props.objectName + 'Detail');
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
        return append.angularRoute(
          content,
          $this.props.objectUrl + 's/:' + $this.props.objectName + 'Id',
          $this.props.objectUrl + '-detail');
      }
    });
  }
});
