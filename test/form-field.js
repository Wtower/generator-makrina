/**
 * Created by gkarak on 31/8/2016.
 */
'use strict';
var lodash = require('lodash');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:form-field', function () {
  var destination = 'public/javascripts/admin/node-detail/node-detail.template.html';

  var props = {
    angularAppName: 'admin',
    fieldName: 'description',
    labelName: 'Description',
    objectName: 'node',
    objectTitle: 'Node',
    objectUrl: 'node'
  };

  var runs = [{
    it: 'default (textbox)',
    props: props,
    expect: 'input type="text"'
  }, {
    it: 'textbox',
    props: lodash.extend(props, {fieldType: 't'}),
    expect: 'input type="text"'
  }, {
    it: 'select combo box',
    props: lodash.extend(props, {fieldType: 's'}),
    expect: 'input type="text"'
  }];

  runs.forEach(function (run) {
    before(function () {
      return helpers
        .run(path.join(__dirname, '../generators/form-field'))
        .inTmpDir(function (dir) {
          fs.copySync(
            path.join(__dirname, '../generators/angular-component-detail/templates/_object-name_-detail.template.html'),
            path.join(dir, destination)
          );
        })
        .withPrompts(run.props)
        .toPromise();
    });

    it('updates template file for '/* + run.it*/, function () {
      assert.fileContent(destination, '\n\n          <!-- Field: Description');
      assert.fileContent(destination, run.expect);
      assert.fileContent(destination, '/div>\n\n          <!-- Buttons');
    });
  });
});
