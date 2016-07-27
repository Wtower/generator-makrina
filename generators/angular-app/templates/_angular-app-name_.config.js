/**
 * Created by yeoman generator-makrina:angular-app on <%= date %>.
 */

angular
  .module('<%= angularAppFullName %>')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
    }
  ]);
