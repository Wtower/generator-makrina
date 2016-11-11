/**
 * Created by yeoman generator-makrina:angular-core-service <%= version %> for <%= objectTitle %> on <%= date %>.
 */

angular
  .module('core.<%= objectName %>')
  .factory('<%= objectTitle %>', ['$gaResource',
    function ($resource) {
      return $resource('api/<%= objectUrl %>s');
    }
  ]);
