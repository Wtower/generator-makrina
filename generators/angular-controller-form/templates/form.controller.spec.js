/**
 * Created by yeoman generator-makrina:angular-controller-form <%= version %> on <%= date %>.
 */

describe('FormController', function() {
  beforeEach(module('<%= angularAppFullName %>'));

  describe('FormController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      var formData = {};
      $httpBackend
        .expectGET('api/contact')
        .respond(formData);
      ctrl = $componentController('FormController');
    }));

    it('should post form data', function() {
      jasmine.addCustomEqualityTester(angular.equals);
      expect(ctrl.obj).toEqual({});
      $httpBackend.flush();
    });
  });
});
