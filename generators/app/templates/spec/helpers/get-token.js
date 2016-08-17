/**
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var expect = require('chai').expect;

var getToken = function (setCookie) {
  // http://stackoverflow.com/questions/18773846/how-to-test-endpoints-protected-by-csrf-in-node-js-express
  var csrfToken = unescape(/XSRF-TOKEN=(.*?);/.exec(setCookie)[1]);
  expect(csrfToken, 'CSRF token').to.exist;
  return csrfToken;
};

module.exports = getToken;
