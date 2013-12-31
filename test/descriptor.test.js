/* global describe, it, expect */

var Descriptor = require('../lib/descriptor');
var Link = require('../lib/link');


describe('Descriptor', function() {
  
  describe('constructor', function() {
    var desc = new Descriptor();
    
    it('should not set subject property', function() {
      expect(desc.subject).to.be.undefined;
    });
    
    it('should not set expires property', function() {
      expect(desc.expires).to.be.undefined;
    });
    
    it('should not add any aliases', function() {
      expect(desc.aliases).to.be.an('array');
      expect(desc.aliases).to.have.length(0);
    });
    
    it('should not add any properties', function() {
      expect(desc.properties).to.be.an('object');
      expect(desc.properties.length).to.equal(0);
    });
    
    it('should not add any links', function() {
      expect(desc.links).to.be.an('array');
      expect(desc.links).to.have.length(0);
    });
  });
  
  describe('constructor with subject', function() {
    var desc = new Descriptor('http://example.com/gpburdell');
    
    it('should set subject property', function() {
      expect(desc.subject).to.equal('http://example.com/gpburdell');
    });
  });
  
  describe('#setSubject', function() {
    var desc = new Descriptor();
    desc.setSubject('http://example.com/gpburdell');
    
    it('should set subject property', function() {
      expect(desc.subject).to.equal('http://example.com/gpburdell');
    });
  });
  
  describe('#setExpires', function() {
    var desc = new Descriptor();
    desc.setExpires(new Date("Wed, 09 Aug 1995 00:00:00 GMT"));
    
    it('should set expires property', function() {
      expect(desc.expires).to.be.an.instanceOf(Date);
    });
  });
  
  describe('#addAlias', function() {
    var desc = new Descriptor();
    desc.addAlias('http://people.example.com/gpburdell');
    
    it('should add alias', function() {
      expect(desc.aliases).to.be.an('array');
      expect(desc.aliases).to.have.length(1);
      expect(desc.aliases[0]).to.equal('http://people.example.com/gpburdell');
    });
  });
  
  describe('#addProperty', function() {
    var desc = new Descriptor();
    desc.addProperty('http://spec.example.net/version', '1.0');
    
    it('should add property', function() {
      expect(desc.properties).to.be.an('object');
      expect(desc.properties.length).to.equal(1);
      expect(desc.properties.has('http://spec.example.net/version')).to.be.true;
    });
  });
  
  describe('#addLink with href, rel, type', function() {
    var desc = new Descriptor();
    desc.addLink('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
    
    it('should add link', function() {
      expect(desc.links).to.be.an('array');
      expect(desc.links).to.have.length(1);
      expect(desc.links[0].href).to.equal('http://photos.example.com/gpburdell.jpg');
    });
  });
  
  describe('#addLink with options', function() {
    var desc = new Descriptor();
    desc.addLink({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
    
    it('should add link', function() {
      expect(desc.links).to.be.an('array');
      expect(desc.links).to.have.length(1);
      expect(desc.links[0].template).to.equal('https://example.com/lrdd/?uri={uri}');
    });
  });
  
  describe('#addLink with link', function() {
    var desc = new Descriptor();
    var link = new Link('http://services.example.com/auth')
    desc.addLink(link);
    
    it('should add link', function() {
      expect(desc.links).to.be.an('array');
      expect(desc.links).to.have.length(1);
      expect(desc.links[0].href).to.equal('http://services.example.com/auth');
    });
  });
  
});
