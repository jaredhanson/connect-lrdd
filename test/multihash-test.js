var vows = require('vows');
var assert = require('assert');
var util = require('util');
var MultiHash = require('multihash');


vows.describe('MultiHash').addBatch({

  'multihash with no elements': {
    topic: function() {
      return new MultiHash();
    },
    
    'should report length of zero' : function(hash) {
      assert.lengthOf(hash, 0);
    },
    'should not have key' : function(hash) {
      assert.isFalse(hash.has('something'));
    },
    'should report count of zero values for key' : function(hash) {
      assert.equal(hash.count('something'), 0);
    },
    'should not yield any key-value pairs when iterating' : function(hash) {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      assert.lengthOf(obj, 0);
    },
  },
  
  'multihash with two single-value elements': {
    topic: function() {
      var hash = new MultiHash();
      hash.put('hello', 'world');
      hash.put('foo', 'bar');
      return hash;
    },
    
    'should report length of two' : function(hash) {
      assert.lengthOf(hash, 2);
    },
    'should have keys' : function(hash) {
      assert.isTrue(hash.has('hello'));
      assert.isTrue(hash.has('foo'));
    },
    'should report count of one value for each key' : function(hash) {
      assert.equal(hash.count('hello'), 1);
      assert.equal(hash.count('foo'), 1);
    },
    'should yield key-value pairs when iterating' : function(hash) {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      assert.lengthOf(obj, 2);
      assert.equal(obj[0].key, 'hello');
      assert.equal(obj[0].value, 'world');
      assert.equal(obj[1].key, 'foo');
      assert.equal(obj[1].value, 'bar');
    },
  },
  
  'multihash with one multi-value element': {
    topic: function() {
      var hash = new MultiHash();
      hash.put('foo', 'bar');
      hash.put('foo', 'baz');
      return hash;
    },
    
    'should report length of one' : function(hash) {
      assert.lengthOf(hash, 1);
    },
    'should have key' : function(hash) {
      assert.isTrue(hash.has('foo'));
    },
    'should report count of two values for key' : function(hash) {
      assert.equal(hash.count('foo'), 2);
    },
    'should yield key-value pairs when iterating' : function(hash) {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      });
      
      assert.lengthOf(obj, 2);
      assert.equal(obj[0].key, 'foo');
      assert.equal(obj[0].value, 'bar');
      assert.equal(obj[1].key, 'foo');
      assert.equal(obj[1].value, 'baz');
    },
    'should yield last key-value pair when iterating with flatten option' : function(hash) {
      var obj = [];
      hash.forEach(function(key, value) {
        obj.push({ key: key, value: value });
      }, { flatten: true });
      
      assert.lengthOf(obj, 1);
      assert.equal(obj[0].key, 'foo');
      assert.equal(obj[0].value, 'baz');
    },
  },

}).export(module);
