/**
 * Created by yeoman generator-makrina:angular-app <%= version %> on <%= date %>.
 */

angular
  .module('<%= angularAppFullName %>')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
    }
  ]);
