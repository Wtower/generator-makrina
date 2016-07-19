/**
 * Created by yeoman generator-makrina:angular-core-service for <%= objectTitle %> on <%= date %>.
 */

angular
  .module('core.<%= objectName %>')
  .factory('<%= objectTitle %>', ['$resource',
    function ($resource) {
      return $resource('api/<%= objectUrl %>s');
    }
  ]);
