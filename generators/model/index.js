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
    this.log('Generating ' + chalk.red('model') + ' for mongoose and api endpoints');

    return this.prompt(this.options.objectName ? [] : prompts.angularObjectPrompts(this))
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  saveConfig: function () {
    this.config.set('objectName', this.props.objectName);
    this.config.set('objectTitle', this.props.objectTitle);
    this.config.set('objectUrl', this.props.objectUrl);
  },

  writing: function () {
    var templatePaths = [
      'models/_object-name_.js.ejs',
      'routes/api/_object-name_s.js.ejs'
    ];

    if (this.options.objectName) lodash.extend(this.props, this.options);
    var context = buildContext({
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle
    });
    var $this = this;
    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(pathNames(templatePath, $this.props)),
        context
      );
    });

    // Modify files: append model route to express app
    var templatePath = 'app.js';
    this.fs.copy(
      this.destinationPath(templatePath), this.destinationPath(templatePath), {
        process: function (content) {
          return append.expressRoute(content, $this.props.objectName, $this.props.objectTitle, $this.props.objectUrl);
        }
      });

    // Modify files: append model require to mongoose service
    templatePath = this.destinationPath('services', 'mongoose.js');
    this.fs.copy(templatePath, templatePath, {
      process: function (content) {
        return append.mongoose(content, $this.props.objectUrl);
      }
    });
  }
});
