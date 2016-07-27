/**
 * Created by gkarak on 27/7/2016.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var lodash = require('lodash');
var buildPrompts = require('../../services/prompts');
var buildContext = require('../../services/build-context');
var pathNames = require('../../services/path-names');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Generating ' + chalk.red('angular-component-list') + ' module');

    return this.prompt(this.options.objectName? []: buildPrompts(this))
      .then(function (props) {
        this.props = props;
      }.bind(this));
  },

  writing: function () {
    var templatePaths = [
      '_object-name_-list.module.js',
      '_object-name_-list.component.js.ejs',
      '_object-name_-list.component.spec.js.ejs',
      '_object-name_-list.template.html'
    ];

    if (this.options.objectName) lodash.extend(this.props, this.options);
    var context = buildContext({
      angularAppName: this.props.angularAppName,
      objectName: this.props.objectName,
      objectTitle: this.props.objectTitle,
      objectUrl: this.props.objectUrl
    });
    var $this = this;
    var destinationPrefix = path.join('public/javascripts/', this.props.angularAppName, this.props.objectUrl + '-list');

    templatePaths.forEach(function (templatePath) {
      $this.fs.copyTpl(
        $this.templatePath(templatePath),
        $this.destinationPath(path.join(destinationPrefix, pathNames(templatePath, $this.props))),
        context
      );
    });

    // Modify files: append object-list to app module
    var templatePath = path.join(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.angularAppName + '.module.js'
    );
    this.fs.copy(
      this.destinationPath(templatePath), this.destinationPath(templatePath), {
        process: function (content) {
          content = content.toString();
          // first cover case where the dependencies are empty: replace `[\n]);` with `[\n  'objectList'\n]);`
          // http://regexr.com/3dt1l
          var newContent = content.replace(
            new RegExp("[[](\n][)];)", 'gm'),
            "[\n  '" + $this.props.objectName + "List'$1"
          );
          if (content == newContent) {
            // otherwise if dependencies are not empty: replace `'\n]);` with `',\n  'objectList'\n]);`
            // http://regexr.com/3dt19
            newContent = content.replace(
              new RegExp("'(\n][)];)", 'gm'),
              "',\n  '" + $this.props.objectName + "List'$1"
            );
          }
          return newContent;
        }
      });

    // Modify files: append object-list route to app config
    templatePath = path.join(
      'public/javascripts/',
      this.props.angularAppName,
      this.props.angularAppName + '.config.js'
    );
    this.fs.copy(
      this.destinationPath(templatePath), this.destinationPath(templatePath), {
        process: function (content) {
          content = content.toString();
          // replace `    }\n  ]);` with `\n    object$1`
          // http://regexr.com/3dt1i
          return content.replace(
            new RegExp("(\\s*}\n\\s*][)];)", 'gm'),
            "\n      $routeProvider" +
              "\n        .when('/" + $this.props.objectUrl + "s', {" +
              "\n          template: '<" + $this.props.objectName + "-list></" + $this.props.objectName + "-list>'" +
              "\n        })" +
              "\n        .otherwise('/" + $this.props.objectName + "s');$1"
          );
        }
      });
  }
});
