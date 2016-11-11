/**
 * Created by yeoman generator-makrina:angular-app <%= version %> on <%= date %>.
 */

angular
  .module('dashboard')
  .component('dashboard', {
    templateUrl: 'javascripts/<%= angularAppName %>/dashboard/dashboard.template.html',
    controller: [//'Object1', 'Object2',
      function DashboardController() {
        // here populate objects
      }
    ]
  });
