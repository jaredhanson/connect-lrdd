/* global describe, it, expect */

var lrdd = require('..');

describe('connect-lrdd', function() {
  
  it('should export constructors', function() {
    expect(lrdd.Descriptor).to.be.a('function');
    expect(lrdd.Link).to.be.a('function');
  });
  
  it('should export middleware', function() {
    expect(lrdd.descriptor).to.be.a('function');
    expect(lrdd.lrdd).to.be.a('function');
    expect(lrdd.descriptor).to.equal(lrdd.lrdd);
  });
  
});
