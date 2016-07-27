/**
 * Helper function to replace file names with prompt variables
 * Created by gkarak on 26/7/2016.
 */
var path = require('path');

var pathNames = function (templatePath, props) {
  var output = templatePath;

  output = output.replace('_name_', props.name);
  output = output.replace('_angular-app-name_', props.angularAppName);
  output = output.replace('_object-name_', props.objectUrl);

  output = output.replace(path.sep + '_', path.sep + '.');
  if (output.startsWith('_')) output = '.' + output.substring(1, output.length);

  return output;
};

module.exports = pathNames;
