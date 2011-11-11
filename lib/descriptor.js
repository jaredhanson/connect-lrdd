/**
 * Module dependencies.
 */
var Link = require('./link');
var MultiHash = require('./multihash');


/**
 * `Descriptor` constructor.
 *
 * Constructs a new `Descriptor` with optional subject `uri`.
 *
 * @param {String} uri
 * @api public
 */
function Descriptor(uri) {
  this.subject = uri;
  this.aliases = [];
  this.properties = new MultiHash();
  this.links = [];
}

/**
 * Set expiration.
 *
 * @param {Date} date
 * @api public
 */
Descriptor.prototype.setExpires = function(date) {
  this.expires = date;
}

/**
 * Set subject `uri`.
 *
 * @param {String} uri
 * @api public
 */
Descriptor.prototype.setSubject = function(uri) {
  this.subject = uri;
}

/**
 * Add alias `uri`.
 *
 * @param {String} uri
 * @api public
 */
Descriptor.prototype.addAlias = function(uri) {
  this.aliases.push(uri);
}

/**
 * Add property identified by `uri` with `value`.
 *
 * @param {String} uri
 * @param {String} value
 * @api public
 */
Descriptor.prototype.addProperty = function(uri, value) {
  value = value || null;
  this.properties.put(uri, value);
}

/**
 * Add link.
 *
 * Examples:
 *
 *     descriptor.addLink('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
 *
 *     descriptor.addLink({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
 *
 *     descriptor.addLink(new Link('http://services.example.com/auth'));
 *
 * @param {String|Object|Link} href
 * @param {String} rel
 * @param {String} type
 * @api public
 */
Descriptor.prototype.addLink = function(href, rel, type) {
  var link = (href instanceof Link) ? href : new Link(href, rel, type);
  this.links.push(link);
}


/**
 * Expose `Descriptor`.
 */ 
module.exports = Descriptor;
