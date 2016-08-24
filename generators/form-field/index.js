/**
 * Created by gkarak on 20/8/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var lodash = require('lodash');
var buildPrompts = require('../../services/prompts');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');
var append = require('../../services/append');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('form-field') + ' for angular detail form template');

    return this.prompt(this.options.objectName ? [] : buildPrompts(this))
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  writing: function () {
    if (this.options.objectName) lodash.extend(this.props, this.options);
    var $this = this;
    // Template
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(path.join(destinationPrefix, pathNames(templatePath, $this.props))),
      context
    );
    // Modify files: append field to form
    var templatePath = path.join(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.objectUrl + '-detail',
      this.props.objectUrl + '-detail.template.html'
    );
    this.fs.copy(
      this.destinationPath(templatePath), this.destinationPath(templatePath), {
        process: function (content) {
          return append.formField(content, $this.props.objectName + 'Detail');
        }
      });
  }
});
