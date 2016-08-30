/**
 * Created by gkarak on 9/8/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var buildPrompts = require('../../services/prompts');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-controller-form') + ' controller');

    // sub-generator only runs stand-alone
    // return this.prompt(this.options.objectName ? [] : buildPrompts(this))
    return this.prompt(buildPrompts(this))
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  writing: function () {
    var templatePaths = [
      'form.controller.js',
      'form.controller.spec.js'
    ];

    // if (this.options.objectName) lodash.extend(this.props, this.options);
    var context = buildContext({
      angularAppName: this.props.angularAppName,
      angularAppFullName: this.props.angularAppFullName
    });
    var $this = this;

    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(
          'public/javascripts/',
          $this.props.angularAppName,
          'form',
          pathNames(templatePath, $this.props)
        ),
        context
      );
    });
  }
});
