var MultiHash = require('./multihash');


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

Link.prototype.addTitle = function(title, lang) {
  lang = lang || '_';
  this.titles.put(lang, title);
}

Link.prototype.addProperty = function(uri, value) {
  value = value || null;
  this.properties.put(uri, value);
}


/**
 * Expose `Link`.
 */ 
module.exports = Link;
