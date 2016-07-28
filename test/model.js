/**
 * Created by gkarak on 29/7/2016.
 */
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs-extra');

describe('generator-makrina:model', function () {
  // run with and without options to increase branch coverage
  var runs = [
    {it: 'no options', options: {}},
    {it: 'options', options: {
      objectName: 'node',
      objectTitle: 'Node',
      objectUrl: 'node'
    }}];

  runs.forEach(function (run) {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/model'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../generators/app/templates/app.js'), path.join(dir, 'app.js'));
          fs.copySync(
            path.join(__dirname, '../generators/app/templates/services/mongoose.js'),
            path.join(dir, 'services/mongoose.js')
          );
        })
        .withOptions(run.options)
        .toPromise();
    });

    it('creates files with ' + run.it, function () {
      var paths = [
        'models/node.js',
        'routes/api/nodes.js'
      ];
      paths.forEach(function (p) {
        assert.file(p);
      });
    });

    it('updates files with ' + run.it, function () {
      assert.fileContent('app.js', 'apiNodes');
      assert.fileContent('services/mongoose.js', 'models/node');
    });
  });
});
