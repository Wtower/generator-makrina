/**
 * Helper function to add common variables to context
 * Created by gkarak on 26/7/2016.
 */
var lodash = require('lodash');
var pack = require('../package.json');

var buildContext = function (context) {
  var today = new Date();
  lodash.extend(context, {
    today: today,
    date: [today.getDate(), today.getMonth() + 1, today.getFullYear()].join('/'),
    version: pack.version
  });
  return context;
};

module.exports = buildContext;
