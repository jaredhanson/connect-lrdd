var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Link = require('link');


vows.describe('Link').addBatch({

  'link constructed with an href': {
    topic: function() {
      return new Link('http://services.example.com/auth');
    },
    
    'should have correct properties' : function(link) {
      assert.equal(link.href, 'http://services.example.com/auth');
      assert.isUndefined(link.template);
      assert.isUndefined(link.rel);
      assert.isUndefined(link.type);
      assert.length(link.titles, 0);
      assert.length(link.properties, 0);
    },
  },
  
  'link constructed with an href and rel': {
    topic: function() {
      return new Link('http://services.example.com/auth', 'http://spec.example.net/auth/1.0');
    },
    
    'should have correct properties' : function(link) {
      assert.equal(link.href, 'http://services.example.com/auth');
      assert.isUndefined(link.template);
      assert.equal(link.rel, 'http://spec.example.net/auth/1.0');
      assert.isUndefined(link.type);
      assert.length(link.titles, 0);
      assert.length(link.properties, 0);
    },
  },
  
  'link constructed with an href, rel, and type': {
    topic: function() {
      return new Link('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
    },
    
    'should have correct properties' : function(link) {
      assert.equal(link.href, 'http://photos.example.com/gpburdell.jpg');
      assert.isUndefined(link.template);
      assert.equal(link.rel, 'http://spec.example.net/photo/1.0');
      assert.equal(link.type, 'image/jpeg');
      assert.length(link.titles, 0);
      assert.length(link.properties, 0);
    },
  },
  
  'link constructed with options': {
    topic: function() {
      return new Link({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
    },
    
    'should have correct properties' : function(link) {
      assert.isUndefined(link.href);
      assert.equal(link.template, 'https://example.com/lrdd/?uri={uri}');
      assert.equal(link.rel, 'lrdd');
      assert.equal(link.type, 'application/xrd+xml');
      assert.length(link.titles, 0);
      assert.length(link.properties, 0);
    },
  },
  
  'link with titles': {
    topic: function() {
      var link = new Link('http://photos.example.com/gpburdell.jpg');
      link.addTitle('User Photo');
      link.addTitle('Benutzerfoto', 'de');
      return link;
    },
    
    'should have correct titles' : function(link) {
      assert.length(link.titles, 2);
      assert.equal(link.titles.count('_'), 1);
      assert.equal(link.titles.count('de'), 1);
    },
  },
  
  'link with properties': {
    topic: function() {
      var link = new Link('http://photos.example.com/gpburdell.jpg');
      link.addProperty('http://spec.example.net/created/1.0', '1970-01-01');
      return link;
    },
    
    'should have correct properties' : function(link) {
      assert.length(link.properties, 1);
    },
  },

}).export(module);
