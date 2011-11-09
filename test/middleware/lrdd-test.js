var vows = require('vows');
var assert = require('assert');
var util = require('util');
var lrdd = require('middleware/lrdd');
var Descriptor = require('descriptor');


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
        desc.setSubject('http://example.com/gpburdell');
        desc.addAlias('http://people.example.com/gpburdell');
        desc.addAlias('acct:gpburdell@example.com');
        desc.addProperty('http://spec.example.net/type/person');
        desc.addProperty('http://spec.example.net/version', '1.0');
        desc.addProperty('http://spec.example.net/version', '2.0');
        
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
      'should set location in response data' : function(err, req, res) {
        //assert.equal(res._data, 'x');
      },
    },
  },

}).export(module);
