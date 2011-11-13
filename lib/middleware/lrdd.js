module.exports = function lrdd(fn, options) {
  options = options || {};
  var param = options.param || 'uri';
  
  return function lrdd(req, res, next) {
    var uri = undefined;
    if (req.params && req.params[param]) {
      uri = req.params[param];
    } if (req.query && req.query[param]) {
      uri = req.query[param];
    }
    
    function done(err, descriptor) {
      if (err) { return next(err); }
      
      var format = options.format;
      if (req.headers) {
        if (req.headers['content-type'] == 'application/xrd+xml') { format = 'xml' }
        else if (req.headers['content-type'] == 'application/json') { format = 'json' }
      }
      
      if (format === 'json') {
        var jrd = serializeToJRD(descriptor);
        res.setHeader('Content-Type', 'application/json');
        res.end(jrd);
      } else {
        var xrd = serializeToXRD(descriptor);
        res.setHeader('Content-Type', 'application/xrd+xml');
        res.end(xrd);
      }
    }
    
    var arity = fn.length;
    if (arity == 2) { // async
      fn(uri, done);
    } else { // sync
      done(null, fn(uri));
    }
  }
}


function serializeToXRD(descriptor) {
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

  return xml;
}

function serializeToJRD(descriptor) {
  var obj = {};
  if (descriptor.expires) { obj.expires = XSDDateTimeString(descriptor.expires) }
  if (descriptor.subject) { obj.subject = descriptor.subject }
  if (descriptor.aliases.length > 0) {
    obj.aliases = [];
    descriptor.aliases.forEach(function(alias) {
      obj.aliases.push(alias);
    });
  }
  
  if (descriptor.properties.length > 0) {
    obj.properties = {};
    descriptor.properties.forEach(function(key, value) {
      obj.properties[key] = value;
    }, { flatten: true });
  }
  
  if (descriptor.links.length > 0) {
    obj.links = [];
    descriptor.links.forEach(function(link) {
      var l = {};
      if (link.rel) { l.rel = link.rel }
      if (link.href) { l.href = link.href }
      if (link.template) { l.template = link.template }
      if (link.type) { l.type = link.type }
      
      if (link.titles.length > 0) {
        l.titles = {};
        link.titles.forEach(function(lang, title) {
          if (lang === '_') {
            l.titles['default'] = title;
          } else {
            l.titles[lang] = title;
          }
        }, { flatten: true });
      }
      
      if (link.properties.length > 0) {
        l.properties = {};
        link.properties.forEach(function(key, value) {
          l.properties[key] = value;
        }, { flatten: true });
      }
      
      obj.links.push(l);
    });
  }
  
  return JSON.stringify(obj);
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
