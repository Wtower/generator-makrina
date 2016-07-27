/**
 * Created by gkarak on 26/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var lodash = require('lodash');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-app'));

    var prompts = [];
    if (lodash.isEmpty(this.options)) {
      prompts.concat([{
        // destinationPrefix
        type: 'input',
        name: 'angularAppName',
        message: 'Angular app short name',
        default: 'admin'
      }, {
        // _angular-app-name_.module.js
        type: 'input',
        name: 'angularAppFullName',
        message: 'Angular app name',
        default: this.appname + 'AdminApp'
      }]);
    }

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var templatePaths = [
      '_angular-app-name_.animations.sass',
      '_angular-app-name_.config.js',
      '_angular-app-name_.generic.sass',
      '_angular-app-name_.jquery.js',
      '_angular-app-name_.module.js'
    ];

    if (!lodash.isEmpty(this.options)) lodash.extend(this.props, this.options);
    // Template context variables
    var context = buildContext({
      angularAppName: this.props.angularAppName,
      angularAppFullName: this.props.angularAppFullName
    });
    var $this = this;
    var destinationPrefix = path.join('public/javascripts/', this.props.angularAppName);

    // Copy all templates
    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(path.join(destinationPrefix, pathNames(templatePath, $this.props))),
        context
      );
    });
  }
});
