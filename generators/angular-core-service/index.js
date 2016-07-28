/**
 * Created by gkarak on 19/7/2016.
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
    this.log('Generating ' + chalk.red('angular-core-service') + ' module');

    return this.prompt(this.options.objectName ? [] : buildPrompts(this))
      .then(function (props) {
        this.props = props;
      }.bind(this));
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
    var destinationPrefix = path.join('public/javascripts/', this.props.angularAppName, 'core', this.props.objectUrl);

    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(path.join(destinationPrefix, pathNames(templatePath, $this.props))),
        context
      );
    });

    // Modify files: append core.object to core
    // http://stackoverflow.com/questions/19178523/can-yeoman-generators-update-existing-files
    var templatePath = path.join('public/javascripts/', this.props.angularAppName, 'core', 'core.module.js');
    this.fs.copy(
      this.destinationPath(templatePath), this.destinationPath(templatePath), {
        process: function (content) {
          return append.dependency(content, 'core.' + $this.props.objectName);
        }
      });
  }
});
