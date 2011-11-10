/**
 * `MultiHash` constructor.
 *
 * @api private
 */
function MultiHash() {
  this._hash = {};
  this.__defineGetter__('length', this._length);
}

/**
 * Test if `key` is set.
 *
 * @param {String} key
 * @return {Boolean} _true_ if set, _false_ otherwise
 * @api private
 */
MultiHash.prototype.has = function(key) {
  return (this._hash[key] !== undefined);
}

/**
 * Number of values set for `key`.
 *
 * @param {String} key
 * @return {Number}
 * @api private
 */
MultiHash.prototype.count = function(key) {
  return this.has(key) ? this._hash[key].length : 0;
}

/**
 * Put `value` for `key`.
 *
 * Multi-hashes can contain multiple values for the same key.  Putting a value
 * to a key will add a value, rather than replace an existing value.
 *
 * @param {String} key
 * @param {Mixed} value
 * @api private
 */
MultiHash.prototype.put = function(key, value) {
  if (this.has(key)) {
    this._hash[key].push(value);
  } else {
    this._hash[key] = [ value ];
  }
}

/**
 * Executes provided `fn` once per key-value pair.
 *
 * Options:
 *   - `flatten`  iterate over a single (most recent) value per key, defaults to _false_
 *
 * @param {Function} fn
 * @param {Object} options
 * @api private
 */
MultiHash.prototype.forEach = function(fn, options) {
  options = options || {};
  
  var self = this;
  Object.keys(this._hash).forEach(function(key) {
    if (options.flatten) {
      var array = self._hash[key];
      fn(key, array[array.length - 1]);
    } else {
      self._hash[key].forEach(function(value) {
        fn(key, value);
      });
    }
  });
}

/**
 * Number of keys in the multi-hash.
 *
 * @return {Number}
 * @api private
 */
MultiHash.prototype._length = function() {
  return Object.keys(this._hash).length;
}


/**
 * Expose `MultiHash`.
 */ 
module.exports = MultiHash;
