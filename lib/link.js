/**
 * Module dependencies.
 */
var MultiHash = require('./multihash');


/**
 * `Link` constructor.
 *
 * Constructs a new `Link` with the given `href`, `rel`, and `type`.
 * Alternatively, the link properties can be given as `options`.
 *
 * Options:
 *   - `href`      uri reference
 *   - `template`  uri template
 *   - `rel`       link relation
 *   - `type`      media type
 *
 * Examples:
 *
 *     new Link('http://services.example.com/auth');
 *
 *     new Link('http://photos.example.com/gpburdell.jpg', 'http://spec.example.net/photo/1.0', 'image/jpeg');
 *
 *     new Link({ template: 'https://example.com/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
 *
 * @param {String} href
 * @param {String} rel
 * @param {String} type
 * @api public
 */
function Link(href, rel, type) {
  if (typeof href == 'object') {
    var options = href;
    this.href = options.href;
    this.template = options.template;
    this.rel = options.rel;
    this.type = options.type;
  } else {
    this.href = href;
    this.rel = rel;
    this.type = type;
  }
  
  this.titles = new MultiHash();
  this.properties = new MultiHash();
}

/**
 * Add `title`, with optional `lang`.
 *
 * @param {String} title
 * @param {String} lang
 * @api public
 */
Link.prototype.addTitle = function(title, lang) {
  lang = lang || '_';
  this.titles.put(lang, title);
}

/**
 * Add property identified by `uri` with `value`.
 *
 * @param {String} uri
 * @param {String} value
 * @api public
 */
Link.prototype.addProperty = function(uri, value) {
  value = value || null;
  this.properties.put(uri, value);
}


/**
 * Expose `Link`.
 */ 
module.exports = Link;
