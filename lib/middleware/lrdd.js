module.exports = function lrdd(fn) {
  
  return function lrdd(req, res, next) {
    var uri = undefined;
    //var uri = req.query['uri'];
    
    function done(err, descriptor) {
      if (err) { return next(err); }
      
      // TODO: JSON.stringify(descriptor) if requested content type is json
      
      var xml = '<?xml version="1.0" encoding="UTF-8"?>';
      xml += '<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
      
      if (descriptor.expires) {
        xml += '<Expires>' + XSDDateTimeString(descriptor.expires) + '</Expires>';
      }
      
      if (descriptor.subject) {
        xml += '<Subject>' + descriptor.subject + '</Subject>';
      }
      
      descriptor.aliases.forEach(function(alias) {
        xml += '<Alias>' + alias + '</Alias>';
      });
      
      descriptor.properties.forEach(function(key, value) {
        if (value) {
          xml += '<Property type="' + key + '">' + value + '</Property>';
        } else {
          xml += '<Property type="' + key + '" xsi:nil="true" />';
        }
      });
      
      descriptor.links.forEach(function(link) {
        xml += '<Link'
        if (link.rel) { xml += ' rel="' + link.rel + '"' }
        if (link.href) { xml += ' href="' + link.href + '"' }
        if (link.template) { xml += ' template="' + link.template + '"' }
        if (link.type) { xml += ' type="' + link.type + '"' }
        xml += '>';
        
        link.titles.forEach(function(lang, title) {
          if (lang === '_') {
            xml += '<Title>' + title + '</Title>';
          } else {
            xml += '<Title xml:lang="' + lang + '">' + title + '</Title>';
          }
        });
        
        link.properties.forEach(function(key, value) {
          if (value) {
            xml += '<Property type="' + key + '">' + value + '</Property>';
          } else {
            xml += '<Property type="' + key + '" xsi:nil="true" />';
          }
        });
        
        xml += '</Link>';
      });
      
      xml += "</XRD>";
      
      res.setHeader('Content-Type', 'application/xrd+xml');
      res.end(xml);
    }
    
    var arity = fn.length;
    if (arity == 2) { // async
      fn(uri, done);
    } else { // sync
      done(null, fn(uri));
    }
  }
}


// CREDIT: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date
function XSDDateTimeString(d) {
  function pad(n) { return n < 10 ? '0' + n : n }
  return d.getUTCFullYear() + '-'
    + pad(d.getUTCMonth() + 1) + '-'
    + pad(d.getUTCDate()) + 'T'
    + pad(d.getUTCHours()) + ':'
    + pad(d.getUTCMinutes()) + ':'
    + pad(d.getUTCSeconds()) + 'Z'
}
