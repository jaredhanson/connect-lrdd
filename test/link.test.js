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
  
  describe('constructor with href, rel', function() {
    var link = new Link('http://services.example.com/auth', 'http://spec.example.net/auth/1.0');
    
    it('should set href property', function() {
      expect(link.href).to.equal('http://services.example.com/auth');
    });
    
    it('should not set template property', function() {
      expect(link.template).to.be.undefined;
    });
    
    it('should set rel property', function() {
      expect(link.rel).to.equal('http://spec.example.net/auth/1.0');
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
  
  describe('constructor with href, rel, type', function() {
    var link = new Link('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
    
    it('should set href property', function() {
      expect(link.href).to.equal('http://photos.example.com/gpburdell.jpg');
    });
    
    it('should not set template property', function() {
      expect(link.template).to.be.undefined;
    });
    
    it('should set rel property', function() {
      expect(link.rel).to.equal('http://spec.example.net/photo/1.0');
    });
    
    it('should not set type property', function() {
      expect(link.type).to.equal('image/jpeg')
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
  
  describe('constructor with options', function() {
    var link = new Link({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
    
    it('should not set href property', function() {
      expect(link.href).to.be.undefined;
    });
    
    it('should not set template property', function() {
      expect(link.template).to.equal('https://example.com/lrdd/?uri={uri}');
    });
    
    it('should set rel property', function() {
      expect(link.rel).to.equal('lrdd');
    });
    
    it('should not set type property', function() {
      expect(link.type).to.equal('application/xrd+xml')
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
  
  describe('#addTitle', function() {
    var link = new Link('http://photos.example.com/gpburdell.jpg');
    link.addTitle('User Photo');
    link.addTitle('Benutzerfoto', 'de');
    
    it('should add titles', function() {
      expect(link.titles).to.be.an('object');
      expect(link.titles.length).to.equal(2);
      expect(link.titles.count('_')).to.equal(1);
      expect(link.titles.count('de')).to.equal(1);
    });
  });
  
  describe('#addProperty', function() {
    var link = new Link('http://photos.example.com/gpburdell.jpg');
    link.addProperty('http://spec.example.net/created/1.0', '1970-01-01');
    
    it('should add properties', function() {
      expect(link.properties).to.be.an('object');
      expect(link.properties.length).to.equal(1);
    });
  });
  
});
