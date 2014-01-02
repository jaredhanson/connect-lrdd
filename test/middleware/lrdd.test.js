/* global describe, it, before, expect */

var chai = require('chai')
  , lrdd = require('../../lib/middleware/lrdd')
  , Descriptor = require('../../lib/descriptor')
  , Link = require('../../lib/link');
  

describe('middleware/lrdd', function() {
  
  it('should be named lrdd', function() {
    expect(lrdd().name).to.equal('lrdd');
  });
  
  describe('that responds with XRD by default', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function() {
          var desc = new Descriptor();
          desc.setExpires(new Date("Wed, 09 Aug 1995 00:00:00 GMT"));
          desc.setSubject('http://example.com/gpburdell');
          desc.addAlias('http://people.example.com/gpburdell');
          desc.addAlias('acct:gpburdell@example.com');
          desc.addProperty('http://spec.example.net/type/person');
          desc.addProperty('http://spec.example.net/version', '1.0');
          desc.addProperty('http://spec.example.net/version', '2.0');
          desc.addLink('http://services.example.com/auth', 'http://spec.example.net/auth/1.0');
          desc.addLink({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
          var link = new Link('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
          link.addTitle('User Photo');
          link.addTitle('Benutzerfoto', 'de');
          link.addProperty('http://spec.example.net/created/1.0', '1970-01-01');
          link.addProperty('http://spec.example.net/type/place');
          desc.addLink(link);
        
          return desc;
        }))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/xrd+xml');
      expect(response.body).to.equal('<?xml version="1.0" encoding="UTF-8"?>\
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\
<Expires>1995-08-09T00:00:00Z</Expires>\
<Subject>http://example.com/gpburdell</Subject>\
<Alias>http://people.example.com/gpburdell</Alias>\
<Alias>acct:gpburdell@example.com</Alias>\
<Property type="http://spec.example.net/type/person" xsi:nil="true" />\
<Property type="http://spec.example.net/version">1.0</Property>\
<Property type="http://spec.example.net/version">2.0</Property>\
<Link rel="http://spec.example.net/auth/1.0" href="http://services.example.com/auth"></Link>\
<Link rel="lrdd" template="https://example.com/lrdd/?uri={uri}" type="application/xrd+xml"></Link>\
<Link rel="http://spec.example.net/photo/1.0" href="http://photos.example.com/gpburdell.jpg" type="image/jpeg">\
<Title>User Photo</Title>\
<Title xml:lang="de">Benutzerfoto</Title>\
<Property type="http://spec.example.net/created/1.0">1970-01-01</Property>\
<Property type="http://spec.example.net/type/place" xsi:nil="true" />\
</Link>\
</XRD>');
    });
  });
  
  describe('that responds with JRD by default', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function() {
          var desc = new Descriptor();
          desc.setExpires(new Date("Wed, 09 Aug 1995 00:00:00 GMT"));
          desc.setSubject('http://example.com/gpburdell');
          desc.addAlias('http://people.example.com/gpburdell');
          desc.addAlias('acct:gpburdell@example.com');
          desc.addProperty('http://spec.example.net/type/person');
          desc.addProperty('http://spec.example.net/version', '1.0');
          desc.addProperty('http://spec.example.net/version', '2.0');
          desc.addLink('http://services.example.com/auth', 'http://spec.example.net/auth/1.0');
          desc.addLink({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
          var link = new Link('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
          link.addTitle('User Photo');
          link.addTitle('Benutzerfoto', 'de');
          link.addProperty('http://spec.example.net/created/1.0', '1970-01-01');
          link.addProperty('http://spec.example.net/type/place');
          desc.addLink(link);
        
          return desc;
        }, { format: 'json' }))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/json');
      expect(response.body).to.equal('{"expires":"1995-08-09T00:00:00Z",\
"subject":"http://example.com/gpburdell",\
"aliases":["http://people.example.com/gpburdell",\
"acct:gpburdell@example.com"],\
"properties":{"http://spec.example.net/type/person":null,\
"http://spec.example.net/version":"2.0"},\
"links":[\
{"rel":"http://spec.example.net/auth/1.0","href":"http://services.example.com/auth"},\
{"rel":"lrdd","template":"https://example.com/lrdd/?uri={uri}","type":"application/xrd+xml"},\
{"rel":"http://spec.example.net/photo/1.0","href":"http://photos.example.com/gpburdell.jpg","type":"image/jpeg",\
"titles":{"default":"User Photo","de":"Benutzerfoto"},\
"properties":{"http://spec.example.net/created/1.0":"1970-01-01","http://spec.example.net/type/place":null}}\
]}');
    });
  });
  
  describe('that responds with JRD due to content negotiation', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri) {
          return new Descriptor(uri);
        }))
        .req(function(req) {
          request = req;
          req.headers = {};
          req.headers.accept = 'application/json'
          req.query = {};
          req.query.uri = 'http://blog.example.com/article/id/314';
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/json');
      expect(response.body).to.equal('{"subject":"http://blog.example.com/article/id/314"}');
    });
  });
  
  describe('that responds with XRD due to content negotiation', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri) {
          return new Descriptor(uri);
        }, { format: 'json' }))
        .req(function(req) {
          request = req;
          req.headers = {};
          req.headers.accept = 'application/xrd+xml'
          req.query = {};
          req.query.uri = 'http://blog.example.com/article/id/314';
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/xrd+xml');
      expect(response.body).to.equal('<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Subject>http://blog.example.com/article/id/314</Subject></XRD>');
    });
  });
  
  describe('that accepts a URI from params and responds synchronously', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri) {
          return new Descriptor(uri);
        }))
        .req(function(req) {
          request = req;
          req.params = {};
          req.params.uri = 'http://blog.example.com/article/id/314';
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/xrd+xml');
      expect(response.body).to.equal('<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Subject>http://blog.example.com/article/id/314</Subject></XRD>');
    });
  });
  
  describe('that accepts a URI from query and responds synchronously', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri) {
          return new Descriptor(uri);
        }))
        .req(function(req) {
          request = req;
          req.query = {};
          req.query.uri = 'http://blog.example.com/article/id/314';
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/xrd+xml');
      expect(response.body).to.equal('<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Subject>http://blog.example.com/article/id/314</Subject></XRD>');
    });
  });
  
  describe('that accepts a URI from query by specifying param option and responds synchronously', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri) {
          return new Descriptor(uri);
        }, { param: 'u' }))
        .req(function(req) {
          request = req;
          req.query = {};
          req.query.u = 'http://blog.example.com/article/id/314';
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/xrd+xml');
      expect(response.body).to.equal('<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Subject>http://blog.example.com/article/id/314</Subject></XRD>');
    });
  });
  
  describe('that accepts a URI from params and responds asynchronously', function() {
    var request, response;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri, done) {
          setTimeout(function() {
            var desc = new Descriptor(uri);
            return done(null, desc);
          }, 1);
        }))
        .req(function(req) {
          request = req;
          req.params = {};
          req.params.uri = 'http://blog.example.com/article/id/314';
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(200);
      expect(response.getHeader('Content-Type')).to.equal('application/xrd+xml');
      expect(response.body).to.equal('<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Subject>http://blog.example.com/article/id/314</Subject></XRD>');
    });
  });
  
  describe('that encounters an error when responding asynchronously', function() {
    var request, error;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri, done) {
          setTimeout(function() {
            return done(new Error('something went wrong'));
          }, 1);
        }))
        .req(function(req) {
          request = req;
          req.params = {};
          req.params.uri = 'http://blog.example.com/article/id/314';
        })
        .next(function(err) {
          error = err;
          done();
        })
        .dispatch();
    });
    
    it('should error', function() {
      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.equal('something went wrong');
    });
  });
  
  describe('that throws an exception when responding synchronously', function() {
    var request, error;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri) {
          throw new Error('something went horribly wrong');
        }))
        .req(function(req) {
          request = req;
          req.params = {};
          req.params.uri = 'http://blog.example.com/article/id/314';
        })
        .next(function(err) {
          error = err;
          done();
        })
        .dispatch();
    });
    
    it('should error', function() {
      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.equal('something went horribly wrong');
    });
  });
  
  describe('that throws an exception when responding asynchronously', function() {
    var request, error;
    
    before(function(done) {
      chai.connect.use(lrdd(function(uri, done) {
          throw new Error('something went horribly wrong');
        }))
        .req(function(req) {
          request = req;
          req.params = {};
          req.params.uri = 'http://blog.example.com/article/id/314';
        })
        .next(function(err) {
          error = err;
          done();
        })
        .dispatch();
    });
    
    it('should error', function() {
      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.equal('something went horribly wrong');
    });
  });
  
});
