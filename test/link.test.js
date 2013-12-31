/* global describe, it, expect */

var Link = require('../lib/link');


describe('Link', function() {
  
  describe('constructor with href', function() {
    var link = new Link('http://services.example.com/auth');
    
    it('should set href property', function() {
      expect(link.href).to.equal('http://services.example.com/auth');
    });
    
    it('should not set template property', function() {
      expect(link.template).to.be.undefined;
    });
    
    it('should not set rel property', function() {
      expect(link.rel).to.be.undefined;
    });
    
    it('should not set type property', function() {
      expect(link.type).to.be.undefined;
    });
    
    it('should not add any titles', function() {
      expect(link.titles).to.be.an('object');
      expect(link.titles.length).to.equal(0);
    });
    
    it('should not add any properties', function() {
      expect(link.properties).to.be.an('object');
      expect(link.properties.length).to.equal(0);
    });
  });
  
});
