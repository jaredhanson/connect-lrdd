/**
 * Module dependencies.
 */
var Descriptor = require('./descriptor');
var Link = require('./link');


/**
 * Expose constructors.
 */
exports.Descriptor = Descriptor;
exports.Link = Link;

/**
 * Expose middleware.
 */
exports.descriptor =
exports.lrdd = require('./middleware/lrdd');
