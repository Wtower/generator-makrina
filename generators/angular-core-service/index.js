/**
 * Created by gkarak on 19/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-core-service') + ' module');
    this.log('Attention: add the generated module to the core module.');

    var prompts = [{
      type: 'input',
      name: 'objectName',
      message: 'Object name (recommended camelCase)'
    }, {
      type: 'input',
      name: 'objectTitle',
      message: 'Object title (recommended PascalCase)',
      default: function (response) {
        // http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
        return response.objectName.charAt(0).toUpperCase() + response.objectName.slice(1);
      }
    }, {
      type: 'input',
      name: 'objectUrl',
      message: 'Object API URL and directory name (recommended kebab-case)',
      default: function (response) {
        // http://stackoverflow.com/questions/30521224/javascript-convert-pascalcase-to-underscore-case
        return response.objectTitle
          .replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "");
      }
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var templatePaths = [
      'module.js',
      'service.js',
      'service.spec.js'
    ];
    var destinationPrefix = 'public/javascripts/admin/core/' + this.props.objectUrl + '/' + this.props.objectUrl + '.';
    var today = new Date();
    var context = {
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl,
      date: [today.getDate(), today.getMonth() + 1, today.getFullYear()].join('/')
    };
    var $this = this;

    templatePaths.forEach(function (file) {
      $this.fs.copyTpl(
        $this.templatePath(file),
        $this.destinationPath(destinationPrefix + file),
        context
      );
    });
  }
});
