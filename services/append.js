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
      new RegExp("[[](\n][)];)", 'gm'),
      "[\n  '" + addition + "'$1"
    );
    if (content == newContent) {
      // otherwise if dependencies are not empty: replace `'\n]);` with `',\n  'core.object'\n]);`
      // http://regexr.com/3dt19
      newContent = content.replace(
        new RegExp("'(\n][)];)", 'gm'),
        "',\n  '" + addition + "'$1"
      );
    }
    return newContent;
  },

  // append a route to a route provider
  route: function (content, url, name) {
    content = content.toString();
    // http://regexr.com/3dt32
    var newContent = content.replace(
      new RegExp("(\\s*\\.otherwise)", 'gm'),
      "\n        .when('/" + url + "', {" +
      "\n          template: '<" + name + "></" + name + "'" +
      "\n        })$1"
    );
    if (content == newContent) {
      // http://regexr.com/3dt1i
      newContent = content.replace(
        new RegExp("(\\s*}\n\\s*][)];)", 'gm'),
        "\n      $routeProvider" +
        "\n        .when('/" + url + "', {" +
        "\n          template: '<" + name + "></" + name + ">'" +
        "\n        })" +
        "\n        .otherwise('/" + url + "');$1"
      );
    }
    return newContent;
  }
};

module.exports = append;
