var vows = require('vows');
var assert = require('assert');
var lrdd = require('index');


vows.describe('connect-lrdd').addBatch({
  
  'module': {
    'should export lrdd middleware': function () {
      assert.isFunction(lrdd.lrdd);
    },
    'should export Descriptor constructor': function () {
      assert.isFunction(lrdd.Descriptor);
    },
    'should export Link constructor': function () {
      assert.isFunction(lrdd.Link);
    },
  },
  
}).export(module);
