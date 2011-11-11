var Link = require('./link');
var MultiHash = require('./multihash');


function Descriptor(subject) {
  this.subject = subject;
  this.aliases = [];
  this.properties = new MultiHash();
  this.links = [];
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

Descriptor.prototype.addLink = function(href, rel, type) {
  var link = (href instanceof Link) ? href : new Link(href, rel, type);
  this.links.push(link);
}


/**
 * Expose `Descriptor`.
 */ 
module.exports = Descriptor;
