/**
 * Keep a single config of prompts
 * Created by gkarak on 27/7/2016.
 */
var lodash = require('lodash');

var prompts = function ($this) {
  /*
   * Main
   */
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

  /*
   * Angular App
   */
  var angularAppPrompts = [{
    // destinationPrefix for angular-app, angular-core-service, angular-component-list, angular-component-detail
    type: 'input',
    name: 'angularAppName',
    message: 'Angular app short name',
    default: 'admin'
  }, {
    // _angular-app-name_.module.js, views/admin.ejs
    type: 'input',
    name: 'angularAppFullName',
    message: 'Angular app name',
    default: $this.appname + 'AdminApp'
  }];

  /*
   * Angular Object
   */
  var angularObjectPrompts = [{
    // angular-core-service: _object-name_.module.js, _object-name_.service.js, _object-name_.service.spec.js,
    //   angular-app: core/core.module.js
    // angular-component-list: _object-name_-list.module.js, _object-name_-list.component.js.ejs,
    //   _object-name_-list.component.spec.js.ejs, _object-name_-list.template.html,
    //   angular-app: _angular-app-name_.module.js, angular-app: _angular-app-name_.config.js
    // angular-component-detail: _object-name_-detail.module.js, _object-name_-detail.component.js.ejs,
    //   _object-name_-detail.component.spec.js.ejs, _object-name_-detail.template.html,
    //   angular-app: _angular-app-name_.module.js, angular-app: _angular-app-name_.config.js
    // model: models/_object-name_.js.ejs, routes/api/_object-name_s.js.ejs, app: app.js
    type: 'input',
    name: 'objectName',
    message: 'Object name (recommended camelCase)',
    default: 'node'
  }, {
    // angular-core-service: _object-name_.service.js
    // angular-component-list: _object-name_-list.component.js.ejs, _object-name_-list.component.spec.js.ejs
    // angular-component-detail: _object-name_-detail.component.js.ejs, _object-name_-detail.component.spec.js.ejs
    // model: models/_object-name_.js.ejs, routes/api/_object-name_s.js.ejs, app: app.js
    type: 'input',
    name: 'objectTitle',
    message: 'Object title (recommended PascalCase)',
    default: function (response) {
      return lodash.upperFirst(lodash.camelCase(response.objectName));
    }
  }, {
    // angular-core-service: _object-name_.service.js
    // angular-component-list: _object-name_-list.component.js.ejs, _object-name_-list.template.html,
    //   angular-app: _angular-app-name_.config.js
    // angular-component-detail: _object-name_-detail.component.js.ejs, _object-name_-detail.template.html,
    //   angular-app: _angular-app-name_.config.js
    // model: app: app.js, app: services/mongoose.js
    type: 'input',
    name: 'objectUrl',
    message: 'Object API URL and directory name (recommended kebab-case)',
    default: function (response) {
      return lodash.kebabCase(response.objectName);
    }
  }];

  /*
   * Form fields
   * angular-component-detail: _object-name_-detail.template.html
   */
  var formFields = [{
    type: 'input',
    name: 'angularAppName',
    message: 'Angular app short name',
    default: 'admin'
  }, {
    type: 'input',
    name: 'fieldName',
    message: 'Field name (camelCase)'
  }, {
    type: 'input',
    name: 'labelName',
    message: 'Label name',
    default: function (response) {
      return lodash.startCase(response.fieldName);
    }
  }, {
    type: 'list',
    name: 'fieldType',
    message: 'Field type',
    choices: [
      {name: 'Text box', value: 'text'},
      {name: 'Select combo box (plain)', value: 'select'},
      {name: 'Checkbox (plain)', value: 'checkbox'}
      // Future:
      // {name: 'Date', value: 'date'},
      // {name: 'Text area', value: 'text-area'},
      // {name: 'Password', value: 'pass'},
      // {name: 'Auto complete (requires jquery ajax)', value: 'auto-complete'},
      // {name: 'Select custom with auto-complete (requires jquery, eg. States)', value: 'select-auto-complete'},
      // {name: 'Select grouped (eg. States by time zone)', value: 'select-grouped'},
      // {name: 'Select multiple (instead of checkboxes)', value: 'select-multiple'},
      // {name: 'Input tags', value: 'tags'},
      // {name: 'Radios', value: 'radio'},
      // {name: 'Switches', value: 'switch'},
      // {name: 'Stars', value: 'stars'}
    ],
    default: 'text'
  }, {
    type: 'confirm',
    name: 'required',
    message: 'Required field',
    default: false
  }, {
    type: 'confirm',
    name: 'readOnly',
    message: 'Read-only field',
    default: false
  }];

  /*
   * SWITCH
   */
  switch ($this.options.namespace) {
    case 'makrina:angular-app':
    case 'makrina:angular-controller-form':
      return angularAppPrompts;
    case 'makrina:angular-core-service':
    case 'makrina:angular-component-list':
    case 'makrina:angular-component-detail':
      return angularAppPrompts.concat(angularObjectPrompts);
    case 'makrina:model':
      return angularObjectPrompts;
    case 'makrina:form-field':
      return formFields.concat(angularObjectPrompts);
    case 'makrina:app':
    default:
      return mainPrompts.concat(angularAppPrompts, angularObjectPrompts);
  }
};

module.exports = prompts;
