var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Descriptor = require('descriptor');
var Link = require('link');


vows.describe('Descriptor').addBatch({

  'descriptor': {
    topic: function() {
      return new Descriptor();
    },
    
    'should not have expires' : function(descriptor) {
      assert.isUndefined(descriptor.expires);
    },
    'should not have a subject' : function(descriptor) {
      assert.isUndefined(descriptor.subject);
    },
    'should not have aliases' : function(descriptor) {
      assert.lengthOf(descriptor.aliases, 0);
    },
    'should not have properties' : function(descriptor) {
      assert.lengthOf(descriptor.properties, 0);
    },
    'should not have links' : function(descriptor) {
      assert.lengthOf(descriptor.links, 0);
    },
    
    'should set expires' : function(descriptor) {
      descriptor.setExpires(new Date("Wed, 09 Aug 1995 00:00:00 GMT"));
      assert.instanceOf(descriptor.expires, Date);
    },
    'should set subject' : function(descriptor) {
      descriptor.setSubject('http://example.com/gpburdell');
      assert.equal(descriptor.subject, 'http://example.com/gpburdell');
    },
    'should add alias' : function(descriptor) {
      descriptor.addAlias('http://people.example.com/gpburdell');
      assert.lengthOf(descriptor.aliases, 1);
      assert.equal(descriptor.aliases[0], 'http://people.example.com/gpburdell');
    },
    'should add property' : function(descriptor) {
      descriptor.addProperty('http://spec.example.net/version', '1.0');
      assert.lengthOf(descriptor.properties, 1);
      assert.isTrue(descriptor.properties.has('http://spec.example.net/version'));
    },
    'should add link with href, rel, type' : function(descriptor) {
      descriptor.addLink('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
      assert.lengthOf(descriptor.links, 1);
      assert.equal(descriptor.links[0].href, 'http://photos.example.com/gpburdell.jpg');
    },
    'should add link with options' : function(descriptor) {
      descriptor.addLink({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
      assert.lengthOf(descriptor.links, 2);
      assert.equal(descriptor.links[1].template, 'https://example.com/lrdd/?uri={uri}');
    },
    'should add link as link' : function(descriptor) {
      var link = new Link('http://services.example.com/auth')
      descriptor.addLink(link);
      assert.lengthOf(descriptor.links, 3);
      assert.equal(descriptor.links[2].href, 'http://services.example.com/auth');
    },
  },
  
  'descriptor with subject': {
    topic: function() {
      return new Descriptor('http://example.com/gpburdell');
    },
    
    'should not have a subject' : function(descriptor) {
      assert.equal(descriptor.subject, 'http://example.com/gpburdell');
    },
  }

}).export(module);
