/* global describe, it, before, expect */

var chai = require('chai')
  , lrdd = require('../../lib/middleware/lrdd');
  

describe('middleware/lrdd', function() {
  
  it('should be named lrdd', function() {
    expect(lrdd().name).to.equal('lrdd');
  });
  
});
