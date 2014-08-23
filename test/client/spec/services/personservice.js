'use strict';

describe('Service: Personservice', function () {

  // load the service's module
  beforeEach(module('hoGApp'));

  // instantiate service
  var Personservice;
  beforeEach(inject(function (_Personservice_) {
    Personservice = _Personservice_;
  }));

  it('should do something', function () {
    expect(!!Personservice).toBe(true);
  });

});
