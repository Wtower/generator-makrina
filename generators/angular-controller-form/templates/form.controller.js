/**
 * Created by yeoman generator-makrina:angular-controller-form <%= version %> on <%= date %>.
 */

angular
  .module('<%= angularAppFullName %>')
  .controller('FormController', ['$scope', '$http',
    function($scope, $http) {
      // Controls if submit button is enabled
      $scope.enable = true;

      // The default submit text and icon
      // To internationalize, either use ng-init function to provide messages from template or use angular i18n
      $scope.action = {icon: 'send', message: 'Submit'};

      // Submit handler
      $scope.submit = function (obj) {
        // Disable button
        $scope.enable = false;

        // Post
        $http.post('/api/contact', obj)
          .then(function () {
            // Success
            $scope.action = {icon: 'check', message: 'Submitted'};
          }, function (res) {
            // Fail
            $scope.action = {icon: 'close', message: 'Failed - Resend'};

            // Re-enable button
            $scope.enable = true;

            console.error(res);
          });
      };
    }]);
