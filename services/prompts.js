/**
 * Keep a single config of prompts
 * Created by gkarak on 27/7/2016.
 */

var prompts = function($this) {

  var mainPrompts = [{
    // package.json, README.md, newrelic.js, services/mongoose.js
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: $this.appname
  }, {
    // newrelic.js, routes/index.js, routes/admin.js
    type: 'input',
    name: 'verboseName',
    message: 'Verbose name',
    default: $this.appname
  }, {
    // package.json, README.md, routes/index.js, views/index.ejs
    type: 'input',
    name: 'description',
    message: 'Description',
    default: $this.appname
  }, {
    // package.json
    type: 'input',
    name: 'git',
    message: 'Git repository URL'
  }, {
    // package.json, LICENSE, CONTRIBUTING.md, views/index.ejs
    type: 'input',
    name: 'author',
    message: 'Author',
    store: true
  }, {
    // views/index.ejs, views/login.ejs, views/admin.ejs
    type: 'input',
    name: 'organization',
    message: 'Organization',
    store: true
  }, {
    // views/login.ejs, views/admin.ejs
    type: 'input',
    name: 'organizationUrl',
    message: 'Organization URL',
    store: true
  }, {
    // package.json
    type: 'input',
    name: 'deployHost',
    message: 'Deploy host',
    store: true
  }, {
    // newrelic.js
    type: 'input',
    name: 'newRelicLicense',
    message: 'New Relic license key',
    store: true
  }];


  var angularAppPrompts = [{
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
    default: $this.appname + 'AdminApp'
  }];


  var angularCoreServicePrompts = [{
    type: 'input',
    name: 'objectName',
    message: 'Object name (recommended camelCase)',
    default: 'node'
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


  switch ($this.options.namespace) {
    case 'makrina:app':
      return mainPrompts.concat(angularAppPrompts, angularCoreServicePrompts);
    case 'makrina:angular-app':
      return angularAppPrompts;
    case 'makrina:angular-core-service':
      return angularCoreServicePrompts;
  }
};

module.exports = prompts;
