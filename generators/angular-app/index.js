/**
 * Created by gkarak on 26/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');
var lodash = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-app'));

    var prompts = [];
    if (lodash.isEmpty(this.options)) {
      prompts.concat([{
        // makrina:angular-app
        type: 'input',
        name: 'angularAppName',
        message: 'Angular app name',
        default: this.options.angularAppName
      }]);
    }

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var templatePaths = [
      '_angular-app-name_.module.js'
    ];

    if (!lodash.isEmpty(this.options)) lodash.extend(this.props, this.options);
    // Template context variables
    var context = buildContext({
      angularAppName: this.props.angularAppName
    });
    var $this = this;
    // var destinationPrefix = 'public/javascripts/admin/core/' + this.props.objectUrl + '/' + this.props.objectUrl + '.';

    // Copy all templates
    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(pathNames(templatePath, $this.props)),
        context
      );
    });
  }
});

// https://github.com/yeoman/generator/issues/552
// http://stackoverflow.com/questions/19178523/can-yeoman-generators-update-existing-files
