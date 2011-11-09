function MultiHash() {
  this._hash = {};
  this.__defineGetter__('length', this._length);
}

MultiHash.prototype.has = function(key) {
  return (this._hash[key] !== undefined);
}

MultiHash.prototype.count = function(key) {
  return this.has(key) ? this._hash[key].length : 0;
}

MultiHash.prototype.put = function(key, value) {
  if (this.has(key)) {
    this._hash[key].push(value);
  } else {
    this._hash[key] = [ value ];
  }
}

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

MultiHash.prototype._length = function() {
  return Object.keys(this._hash).length;
}


/**
 * Expose `MultiHash`.
 */ 
module.exports = MultiHash;
