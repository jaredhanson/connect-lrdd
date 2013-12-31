/* global describe, it, expect */

var Descriptor = require('../lib/descriptor');


describe('Descriptor', function() {
  
  describe('constructor', function() {
    var desc = new Descriptor();
    
    it('should not set subject property', function() {
      expect(desc.subject).to.be.undefined;
    });
    
    it('should not set expires property', function() {
      expect(desc.expires).to.be.undefined;
    });
    
    it('should not set any aliases', function() {
      expect(desc.aliases).to.be.an('array');
      expect(desc.aliases).to.have.length(0);
    });
    
    it('should not set any properties', function() {
      expect(desc.properties).to.be.an('object');
      expect(desc.properties.length).to.equal(0);
    });
    
    it('should not set any links', function() {
      expect(desc.links).to.be.an('array');
      expect(desc.links).to.have.length(0);
    });
  });
  
});
