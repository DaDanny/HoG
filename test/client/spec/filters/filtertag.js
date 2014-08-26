'use strict';

describe('Filter: filterTag', function () {

  // load the filter's module
  beforeEach(module('hoGApp'));

  // initialize a new instance of the filter before each test
  var filterTag;
  beforeEach(inject(function ($filter) {
    filterTag = $filter('filterTag');
  }));

  it('should return the input prefixed with "filterTag filter:"', function () {
    var text = 'angularjs';
    expect(filterTag(text)).toBe('filterTag filter: ' + text);
  });

});
