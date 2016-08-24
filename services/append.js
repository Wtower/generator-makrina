/**
 * Update existing files
 * Created by gkarak on 28/7/2016.
 */

var append = {

  // append a module dependency to an angular module
  dependency: function (content, addition) {
    content = content.toString();
    // first cover case where the dependencies are empty: replace `[\n]);` with `[\n  'core.object'\n]);`
    // http://regexr.com/3dt1l
    var newContent = content.replace(
      new RegExp('[[](\n][)];)', 'gm'),
      "[\n  '" + addition + "'$1"
    );
    if (content === newContent) {
      // otherwise if dependencies are not empty: replace `'\n]);` with `',\n  'core.object'\n]);`
      // http://regexr.com/3dt19
      newContent = content.replace(
        new RegExp("'(\n][)];)", 'gm'),
        "',\n  '" + addition + "'$1"
      );
    }
    return newContent;
  },

  // append a route to an angular route provider
  angularRoute: function (content, url, name) {
    content = content.toString();
    // http://regexr.com/3dt32
    var newContent = content.replace(
      new RegExp('(\\s*\\.otherwise)', 'gm'),
      "\n        .when('/" + url + "', {" +
      "\n          template: '<" + name + '></' + name + ">'" +
      '\n        })$1'
    );
    if (content === newContent) {
      // http://regexr.com/3dt1i
      newContent = content.replace(
        new RegExp('(\\s*}\n\\s*][)];)', 'gm'),
        '\n      $routeProvider' +
        "\n        .when('/" + url + "', {" +
        "\n          template: '<" + name + '></' + name + ">'" +
        '\n        })' +
        "\n        .otherwise('/" + url + "');$1"
      );
    }
    return newContent;
  },

  // append a route to an express app
  expressRoute: function (content, name, title, url) {
    var newContent = content.toString();
    // http://regexr.com/3dt49
    newContent = newContent.replace(
      new RegExp("(var routes = require\\('.\\/routes\\/index'\\);\n)", 'gm'),
      '$1var api' + title + "s = require('./routes/api/" + url + "s');\n"
    );
    // http://regexr.com/3dt4c
    newContent = newContent.replace(
      new RegExp("(app.use\\('\\/', routes\\);\n)", 'gm'),
      "$1app.use('/api/" + url + "s', api" + title + 's);\n'
    );
    return newContent;
  },

  // append a model to mongoose service
  mongoose: function (content, name) {
    var newContent = content.toString();
    // http://regexr.com/3dt57
    return newContent.replace(
      new RegExp("(mongoose.Promise = require\\('bluebird'\\);\n)", 'gm'),
      "$1require('../models/" + name + "');\n"
    );
  },

  // append a field to an angular template form
  formField: function (content, name) {
    var newContent = content.toString();
    // http://regexr.com/3e2he
    return newContent.replace(
      new RegExp('(\n\\W+<!-- Buttons --)', 'gm'),
      ""
    );
  }
};

module.exports = append;
