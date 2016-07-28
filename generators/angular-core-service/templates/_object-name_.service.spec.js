/**
 * Created by yeoman generator-makrina:angular-core-service <%= version %> for <%= objectTitle %> on <%= date %>.
 */
'use strict';

describe('<%= objectName %>', function() {
  var $httpBackend;
  var Object;
  var data = [];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Node` service before each test
  beforeEach(module('core.<%= objectName %>'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Object_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('api/<%= objectName %>s').respond(data);
    Object = _Object_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the <%= objectName %>s data', function() {
    var objects = Object.query();
    expect(objects).toEqual([]);
    $httpBackend.flush();
    expect(objects).toEqual(data);
  });

});
