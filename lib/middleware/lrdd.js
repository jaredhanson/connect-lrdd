module.exports = function lrdd(fn) {
  
  return function lrdd(req, res, next) {
    var uri = undefined;
    //var uri = req.query['uri'];
    
    function done(err, descriptor) {
      if (err) { return next(err); }
      
      // TODO: JSON.stringify(descriptor) if requested content type is json
      
      var xml = '<?xml version="1.0" encoding="UTF-8"?>';
      xml += '<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
      
      // TODO: serialize 'Expires' element
      
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
