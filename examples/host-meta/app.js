var express = require('express')
  , lrdd = require('connect-lrdd')


var app = express.createServer();

// configure Express
app.configure(function() {
  app.use(express.logger());
});

// Mount `lrdd.descriptor()` middlware at the well-known host-meta location.
//   The well-known host-meta location contains metadata about the host and the
//   services it provides.  One of these services includes the "lrdd" service,
//   which can further be queried for additional metadata about resources.
//
// curl -v -G -H 'Accept: application/xrd+xml' "http://127.0.0.1:3000/.well-known/host-meta"
app.get('/.well-known/host-meta', lrdd.descriptor(function(uri, done) {
    var desc = new lrdd.Descriptor();
    desc.addLink({ template: 'http://127.0.0.1:3000/lrdd/?uri={uri}', rel: 'lrdd', type: 'application/xrd+xml' });
    return done(null, desc);
  }));

// Mount `lrdd.descriptor()` middleware at the LRDD service location.
//   The LRDD service provides link-based descriptors about resources available
//   at the host.  In this example, a Webfinger query is being issued for
//   metadata about an account
//
// curl -v -G -H 'Accept: application/xrd+xml' "http://127.0.0.1:3000/lrdd/?uri=acct%3Abob%40example.com"
app.get('/lrdd', lrdd.descriptor(function(uri, done) {
    var desc = new lrdd.Descriptor(uri);
    desc.addAlias('http://127.0.0.1:3000/people/bob');
    return done(null, desc);
  }));

app.listen(3000);
