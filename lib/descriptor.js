var MultiHash = require('./multihash');


function Descriptor() {
  this.aliases = [];
  this.properties = new MultiHash();
}

Descriptor.prototype.setSubject = function(uri) {
  this.subject = uri;
}

Descriptor.prototype.addAlias = function(uri) {
  this.aliases.push(uri);
}

Descriptor.prototype.addProperty = function(uri, value) {
  value = value || null;
  this.properties.put(uri, value);
}


/**
 * Expose `Descriptor`.
 */ 
module.exports = Descriptor;
