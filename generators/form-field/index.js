/**
 * Created by gkarak on 20/8/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var lodash = require('lodash');
var buildPrompts = require('../../services/prompts');
var buildContext = require('../../services/build-context');
var ejs = require('ejs');
var pathNames = require('../../services/path-names');
var append = require('../../services/append');

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
    var context = buildContext({
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl,
      fieldName: this.props.fieldName,
      fieldNameKebab: lodash.kebabCase(this.props.fieldName),
      fullName: this.props.objectName + lodash.upperFirst(this.props.fieldName),
      labelName: this.props.labelName
    });
    var $this = this;

    // Template
    var templatePath;
    switch (this.props.fieldType) {
      case 's':
      case 't':
      default:
            templatePath = 'text.ejs'
    }
    var tpl = this.fs.read(this.templatePath(templatePath));
    tpl = ejs.render(tpl, context);

    // Modify files: append field to form
    templatePath = this.destinationPath(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.objectUrl + '-detail',
      this.props.objectUrl + '-detail.template.html'
    );
    this.fs.copy(templatePath, templatePath, {
      process: function (content) {
        return append.formField(content, tpl);
      }
    });
  }
});
