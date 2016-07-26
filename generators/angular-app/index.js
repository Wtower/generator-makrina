/**
 * Created by gkarak on 26/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-app'));

    var prompts = [{
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var templatePaths = [
    ];

    // Template context variables
    var context = {
      name: this.props.name
    };
    var $this = this;

    // Copy all templates
    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(output),
        context
      );
    });
  }
});

// http://yeoman.io/authoring/composability.html
// https://github.com/yeoman/generator/issues/552
// http://stackoverflow.com/questions/19178523/can-yeoman-generators-update-existing-files
