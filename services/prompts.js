/**
 * Keep a single config of prompts
 * Created by gkarak on 27/7/2016.
 */
var lodash = require('lodash');

/**
 * Return the main generator prompts
 * @param $this: the generator object
 * @returns {*[]}
 */
var mainPrompts = function ($this) {
  return [{
    // package.json, README.md, newrelic.js, services/mongoose.js
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: $this.config.get('name') || $this.appname
  }, {
    // newrelic.js, routes/index.js, routes/admin.js
    type: 'input',
    name: 'verboseName',
    message: 'Verbose name',
    default: function (response) {
      return $this.config.get('verboseName') || lodash.startCase(response.name);
    }
  }, {
    // package.json, README.md, routes/index.js, views/index.ejs
    type: 'input',
    name: 'description',
    message: 'Description',
    default: function (response) {
      return $this.config.get('description') || lodash.startCase(response.name);
    }
  }, {
    // package.json
    type: 'input',
    name: 'git',
    message: 'Git repository URL',
    default: $this.config.get('git')
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
};

/**
 * Return the angular app prompts
 * Used in main generator and all angular sub-generators
 * @param $this
 * @returns {*[]}
 */
var angularAppPrompts = function ($this) {
  return [{
    // destinationPrefix for angular-app, angular-core-service, angular-component-list, angular-component-detail
    type: 'input',
    name: 'angularAppName',
    message: 'Angular app short name',
    default: $this.config.get('angularAppName') || 'admin'
  }, {
    // _angular-app-name_.module.js, views/admin.ejs
    type: 'input',
    name: 'angularAppFullName',
    message: 'Angular app name',
    default: $this.config.get('angularAppFullName') || $this.appname + 'AdminApp'
  }];
};

/**
 * Return angular object prompts
 * Used in main generator, model sub-generator and some angular sub-generators
 * @returns {*[]}
 */
var angularObjectPrompts = function ($this) {
  return [{
    // angular-core-service
    // angular-component-list
    // angular-component-detail
    // model
    type: 'input',
    name: 'objectName',
    message: 'Object name (recommended camelCase)',
    default: $this.config.get('objectName') || 'node'
  }, {
    // angular-core-service
    // angular-component-list
    // angular-component-detail
    // model
    type: 'input',
    name: 'objectTitle',
    message: 'Object title (recommended PascalCase)',
    default: function (response) {
      return $this.config.get('objectTitle') || lodash.upperFirst(lodash.camelCase(response.objectName));
    }
  }, {
    // angular-core-service
    // angular-component-list
    // angular-component-detail
    // model
    type: 'input',
    name: 'objectUrl',
    message: 'Object API URL and directory name (recommended kebab-case)',
    default: function (response) {
      return $this.config.get('objectUrl') || lodash.kebabCase(response.objectName);
    }
  }];
};

module.exports = {
  mainPrompts: mainPrompts,
  angularAppPrompts: angularAppPrompts,
  angularObjectPrompts: angularObjectPrompts
};
