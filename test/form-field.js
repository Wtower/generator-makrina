/**
 * Created by gkarak on 31/8/2016.
 *
 * http://stackoverflow.com/questions/17144197/running-the-same-mocha-test-multiple-times-with-different-data/39286581#39286581
 */
'use strict';
var stubRuns = require('../services/stub');
var sinon = require('sinon');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:form-field', function () {
  var destination = 'public/javascripts/admin/node-detail/node-detail.template.html';

  // Get default props for each field type
  var props = function (fieldType) {
    return {
      angularAppName: 'admin',
      fieldName: 'description',
      labelName: 'Description',
      fieldType: fieldType,
      readOnly: true,
      objectName: 'node',
      objectTitle: 'Node',
      objectUrl: 'node'
    };
  };

  var runs = [{
    it: 'textbox',
    props: props('text'),
    expect: ['input type="text"', 'readonly="readonly"']
  }, {
    it: 'select combo box',
    props: props('select'),
    expect: ['<select class="select2_single', 'disabled="disabled"']
  }];
  var stub = stubRuns(runs, 1);

  beforeEach(function () {
    var run = stub();
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

  runs.forEach(function (run, idx) {
    it('updates template file for ' + run.it, function () {
      sinon.assert.callCount(stub, idx + 1);
      assert.fileContent(destination, '\n\n          <!-- Field: Description');
      assert.fileContent(destination, '/div>\n\n          <!-- Buttons');
      assert.noFileContent(destination, '\n\n\n');
      run.expect.forEach(function (expectItem) {
        assert.fileContent(destination, expectItem);
      });
    });
  });
});
