var vows = require('vows');
var assert = require('assert');
var util = require('util');
var lrdd = require('middleware/lrdd');
var Descriptor = require('descriptor');
var Link = require('link');


function MockRequest() {
}

function MockResponse() {
  this._headers = {};
  this._data = '';
}

MockResponse.prototype.setHeader = function(name, value) {
  this._headers[name] = value;
}

MockResponse.prototype.end = function(data, encoding) {
  if (data) {this._data += data; };
  if (this.done) { this.done(); }
}


vows.describe('lrdd').addBatch({

  'middleware with a function that returns a descriptor': {
    topic: function() {
      return lrdd(function() {
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
      });
    },
    
    'when handling a request': {
      topic: function(lrdd) {
        var self = this;
        
        var req = new MockRequest();
        var res = new MockResponse();
        res.done = function() {
          self.callback(null, req, res);
        }
        
        function next(err) {
          self.callback(new Error('should not be called'));
        }
        process.nextTick(function () {
          lrdd(req, res, next)
        });
      },
      
      'should not call next' : function(err, req, res) {
        assert.isNull(err);
      },
      'should set Content-Type header' : function(err, req, res) {
        assert.equal(res._headers['Content-Type'], 'application/xrd+xml');
      },
      'should format XRD data correctly' : function(err, req, res) {
        assert.equal(res._data, '<?xml version="1.0" encoding="UTF-8"?>\
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
      },
    },
  },

}).export(module);
